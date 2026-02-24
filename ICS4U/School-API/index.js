// index.js
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// -------------------- DB CONNECT --------------------
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI in environment variables");
  await mongoose.connect(uri);
  console.log("✅ MongoDB connected");
}

// -------------------- HELPERS --------------------
function requireObjectId(value, res, label = "_id") {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    res.status(400).json({ error: `Invalid ${label}` });
    return null;
  }
  return value;
}

function pickAllowed(body, allowed) {
  const out = {};
  for (const k of Object.keys(body)) {
    if (allowed.includes(k)) out[k] = body[k];
  }
  return out;
}

const HIDE_LEGACY_ID = "-id";

// -------------------- SCHEMAS / MODELS --------------------
const Teacher = mongoose.model(
  "Teacher",
  new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    room: { type: String, required: true },
  }, { versionKey: false }),
  "teachers"
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    semester: { type: String, required: true },
    room: { type: String, required: true },
    schedule: { type: String, default: "" },
  }, { versionKey: false }),
  "courses"
);

const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    grade: { type: Number, required: true },
    studentNumber: { type: String, required: true, unique: true },
    homeroom: { type: String, default: "" },
  }, { versionKey: false }),
  "students"
);

const Test = mongoose.model(
  "Test",
  new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    testName: { type: String, required: true },
    date: { type: String, required: true },
    mark: { type: Number, required: true },
    outOf: { type: Number, required: true },
    weight: { type: Number, default: 0 },
  }, { versionKey: false }),
  "tests"
);

// -------------------- ROUTES --------------------

// Teachers
app.get("/teachers", async (_, res) => res.json(await Teacher.find().select(HIDE_LEGACY_ID)));
app.get("/teachers/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "teacher _id");
  if (!id) return;
  const doc = await Teacher.findById(id).select(HIDE_LEGACY_ID);
  if (!doc) return res.status(404).json({ error: "Teacher not found" });
  res.json(doc);
});
app.post("/teachers", async (req, res) => res.status(201).json(await Teacher.create(req.body)));
app.put("/teachers/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res);
  if (!id) return;
  const updated = await Teacher.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).select(HIDE_LEGACY_ID);
  if (!updated) return res.status(404).json({ error: "Teacher not found" });
  res.json(updated);
});
app.delete("/teachers/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res);
  if (!id) return;
  if (await Course.exists({ teacherId: id })) return res.status(400).json({ error: "Teacher still assigned to a course" });
  await Teacher.findByIdAndDelete(id);
  res.json({ message: "Teacher deleted" });
});

// Courses
app.get("/courses", async (_, res) => res.json(await Course.find().populate("teacherId").select(HIDE_LEGACY_ID)));
app.post("/courses", async (req, res) => res.status(201).json(await Course.create(req.body)));

// Students
app.get("/students", async (_, res) => res.json(await Student.find().select(HIDE_LEGACY_ID)));
app.post("/students", async (req, res) => {
  try { res.status(201).json(await Student.create(req.body)); }
  catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: "Duplicate studentNumber" });
    res.status(500).json({ error: err.message });
  }
});

// Tests
app.get("/tests", async (_, res) => {
  res.json(await Test.find().populate("studentId").populate("courseId").select(HIDE_LEGACY_ID));
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`)))
  .catch(err => {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  });