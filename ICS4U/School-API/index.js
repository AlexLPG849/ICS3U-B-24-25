// const { error } = require("console");
// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// app.use(express.json());

// // stuff
// function loadJson(file) {
//   return JSON.parse(fs.readFileSync(path.join(__dirname, "data", file), "utf8"));
// }

// function saveJson(file, data) {
//   fs.writeFileSync(path.join(__dirname, "data", file), JSON.stringify(data, null, 2));
// }

// // Load data
// let teachers = loadJson("teachers.json");
// let courses = loadJson("courses.json");
// let students = loadJson("students.json");
// let tests = loadJson("tests.json");

// // Track next IDs
// let nextTeacherId = Math.max(...teachers.map(t => t.id), 0) + 1;
// let nextCourseId = Math.max(...courses.map(c => c.id), 0) + 1;
// let nextStudentId = Math.max(...students.map(s => s.id), 0) + 1;
// let nextTestId = Math.max(...tests.map(t => t.id), 0) + 1;


// // Get all Teachers
// app.get("/teachers", (req, res) => res.json(teachers));
// // Teacher by ID
// app.get("/teachers/:id", (req, res) => {
//   const teacher = teachers.find(t => t.id == req.params.id);
//   if (!teacher) return res.status(404).json({ error: "Teacher not found" });
//   res.json(teacher);
// });
// // Make new teacher
// app.post("/teachers", (req, res) => {
//   const { firstName, lastName, email, department, room } = req.body;
//   if (!firstName || !lastName || !email || !department)
//     return res.status(400).json({ error: "Missing required fields" });

//   const newTeacher = {
//     id: nextTeacherId++,
//     firstName,
//     lastName,
//     email,
//     department,
//     room: room || ""
//   };

//   teachers.push(newTeacher);
//   saveJson("teachers.json", teachers);

//   res.status(201).json(newTeacher);
// });
// // Update Teacher
// app.put("/teachers/:id", (req, res) => {
//   const teacher = teachers.find(t => t.id == req.params.id);
//   if (!teacher) return res.status(404).json({ error: "Teacher not found" });

//   Object.assign(teacher, req.body);
//   saveJson("teachers.json", teachers);

//   res.json(teacher);
// });
// // Remove a Teacher
// app.delete("/teachers/:id", (req, res) => {
//   const teacherId = parseInt(req.params.id);

//   if (courses.some(c => c.teacherId === teacherId))
//     return res.status(400).json({ error: "Cannot delete teacher with assigned courses" });

//   teachers = teachers.filter(t => t.id !== teacherId);
//   saveJson("teachers.json", teachers);

//   res.json({ message: "Deleted" });
// });


// // Get all courses
// app.get("/courses", (req, res) => res.json(courses));
// // Course by ID
// app.get("/courses/:id", (req, res) => {
//   const course = courses.find(c => c.id == req.params.id);
//   if (!course) return res.status(404).json({ error: "Course not found" });
//   res.json(course);
// });
// // Make new course
// app.post("/courses", (req, res) => {
//   const { code, name, teacherId, semester, room, schedule } = req.body;

//   if (!code || !name || !teacherId || !semester || !room)
//     return res.status(400).json({ error: "Missing required fields" });

//   if (!teachers.some(t => t.id === teacherId))
//     return res.status(400).json({ error: "Invalid teacherId" });

//   const newCourse = {
//     id: nextCourseId++,
//     code,
//     name,
//     teacherId,
//     semester,
//     room,
//     schedule: schedule || ""
//   };

//   courses.push(newCourse);
//   saveJson("courses.json", courses);

//   res.status(201).json(newCourse);
// });
// // Update course
// app.put("/courses/:id", (req, res) => {
//   const course = courses.find(c => c.id == req.params.id);
//   if (!course) return res.status(404).json({ error: "Course not found" });

//   if (req.body.teacherId && !teachers.some(t => t.id === req.body.teacherId))
//     return res.status(400).json({ error: "Invalid teacherId" });

//   Object.assign(course, req.body);
//   saveJson("courses.json", courses);

//   res.json(course);
// });
// // Delete course
// app.delete("/courses/:id", (req, res) => {
//   const courseId = parseInt(req.params.id);

//   if (tests.some(t => t.courseId === courseId))
//     return res.status(400).json({ error: "Cannot delete course with test records" });

//   courses = courses.filter(c => c.id !== courseId);
//   saveJson("courses.json", courses);

//   res.json({ message: "Deleted" });
// });


// //get all students
// app.get("/students", (req, res) => res.json(students));
// // studnet by ID
// app.get("/students/:id", (req, res) => {
//   const student = students.find(s => s.id == req.params.id);
//   if (!student) return res.status(404).json({ error: "Student not found" });
//   res.json(student);
// });
// // create new student
// app.post("/students", (req, res) => {
//   const { firstName, lastName, grade, studentNumber, homeroom } = req.body;
//   if (!firstName || !lastName || !grade || !studentNumber)
//     return res.status(400).json({ error: "Missing required fields" });

//   const newStudent = {
//     id: nextStudentId++,
//     firstName,
//     lastName,
//     grade,
//     studentNumber,
//     homeroom: homeroom || ""
//   };

//   students.push(newStudent);
//   saveJson("students.json", students);

//   res.status(201).json(newStudent);
// });
// // updte student
// app.put("/students/:id", (req, res) => {
//   const student = students.find(s => s.id == req.params.id);
//   if (!student) return res.status(404).json({ error: "Student not found" });

//   Object.assign(student, req.body);
//   saveJson("students.json", students);

//   res.json(student);
// });
// // remove stdent
// app.delete("/students/:id", (req, res) => {
//   const studentId = parseInt(req.params.id);

//   if (tests.some(t => t.studentId === studentId))
//     return res.status(400).json({ error: "Cannot delete student with test records" });

//   students = students.filter(s => s.id !== studentId);
//   saveJson("students.json", students);

//   res.json({ message: "Deleted" });
// });


// // get all tests
// app.get("/tests", (req, res) => res.json(tests));
// // test by ID
// app.get("/tests/:id", (req, res) => {
//   const test = tests.find(t => t.id == req.params.id);
//   if (!test) return res.status(404).json({ error: "Test not found" });
//   res.json(test);
// });
// // create a test
// app.post("/tests", (req, res) => {
//   const { studentId, courseId, testName, date, mark, outOf, weight } = req.body;

//   if (!studentId || !courseId || !testName || !date || !mark || !outOf)
//     return res.status(400).json({ error: "Missing required fields" });

//   if (!students.some(s => s.id === studentId))
//     return res.status(400).json({ error: "Invalid studentId" });

//   if (!courses.some(c => c.id === courseId))
//     return res.status(400).json({ error: "Invalid courseId" });

//   const newTest = {
//     id: nextTestId++,
//     studentId,
//     courseId,
//     testName,
//     date,
//     mark,
//     outOf,
//     weight: weight || 0
//   };

//   tests.push(newTest);
//   saveJson("tests.json", tests);

//   res.status(201).json(newTest);
// });
// // update test
// app.put("/tests/:id", (req, res) => {
//   const test = tests.find(t => t.id == req.params.id);
//   if (!test) return res.status(404).json({ error: "Test not found" });

//   if (req.body.studentId && !students.some(s => s.id === req.body.studentId))
//     return res.status(400).json({ error: "Invalid studentId" });

//   if (req.body.courseId && !courses.some(c => c.id === req.body.courseId))
//     return res.status(400).json({ error: "Invalid courseId" });

//   Object.assign(test, req.body);
//   saveJson("tests.json", tests);

//   res.json(test);
// });

// // POC - list all tests for a course
// app.get("/courses/:id/tests", (req, res) => {
//   const course = courses.find(c => c.id == req.params.id);
//   if (course == null) {
//     return res.status(404).json({ error: "Could not find course" });
//   }
//   res.json(tests.filter(t => t.courseId == req.params.id));
// });

  

// // Start server
// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
 
const app = express();
app.use(express.json());
 
// -------------------- DB CONNECT --------------------
async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables (.env or Render)");
  }
  await mongoose.connect(process.env.MONGODB_URI);
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
 
// Hide legacy numeric `id` if it exists in old documents
const HIDE_LEGACY_ID = "-id";
 
// -------------------- SCHEMAS / MODELS --------------------
const Teacher = mongoose.model(
  "Teacher",
  new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      department: { type: String, required: true },
      room: { type: String, required: true },
    },
    { versionKey: false }
  ),
  "teachers"
);
 
const Course = mongoose.model(
  "Course",
  new mongoose.Schema(
    {
      code: { type: String, required: true, unique: true },
      name: { type: String, required: true },
 
      // Mongo relationship
      teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
 
      semester: { type: String, required: true },
      room: { type: String, required: true },
      schedule: { type: String, default: "" },
    },
    { versionKey: false }
  ),
  "courses"
);
 
const Student = mongoose.model(
  "Student",
  new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      grade: { type: Number, required: true },
      studentNumber: { type: String, required: true, unique: true },
      homeroom: { type: String, default: "" },
    },
    { versionKey: false }
  ),
  "students"
);
 
const Test = mongoose.model(
  "Test",
  new mongoose.Schema(
    {
      // Mongo relationships
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
 
      testName: { type: String, required: true },
      date: { type: String, required: true }, // keep as string if your teacher wants
      mark: { type: Number, required: true },
      outOf: { type: Number, required: true },
      weight: { type: Number, default: 0 },
    },
    { versionKey: false }
  ),
  "tests"
);
 
// -------------------- TEACHERS CRUD --------------------
app.get("/teachers", async (req, res) => {
  const docs = await Teacher.find().select(HIDE_LEGACY_ID);
  res.json(docs);
});
 
app.get("/teachers/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "teacher _id");
  if (!id) return;
 
  const doc = await Teacher.findById(id).select(HIDE_LEGACY_ID);
  if (!doc) return res.status(404).json({ error: "Teacher not found" });
 
  res.json(doc);
});
 
app.post("/teachers", async (req, res) => {
  const { firstName, lastName, email, department, room } = req.body;
  if (!firstName || !lastName || !email || !department || !room) {
    return res.status(400).json({ error: "Missing required fields" });
  }
 
  const created = await Teacher.create({ firstName, lastName, email, department, room });
  res.status(201).json(created);
});
 
app.put("/teachers/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "teacher _id");
  if (!id) return;
 
  const update = pickAllowed(req.body, ["firstName", "lastName", "email", "department", "room"]);
  if (Object.keys(update).length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }
 
  const updated = await Teacher.findByIdAndUpdate(id, update, { new: true, runValidators: true }).select(HIDE_LEGACY_ID);
  if (!updated) return res.status(404).json({ error: "Teacher not found" });
 
  res.json(updated);
});
 
app.delete("/teachers/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "teacher _id");
  if (!id) return;
 
  const hasCourse = await Course.exists({ teacherId: id });
  if (hasCourse) {
    return res.status(400).json({ error: "Cannot delete teacher who is still assigned to a course" });
  }
 
  const deleted = await Teacher.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Teacher not found" });
 
  res.json({ message: "Teacher deleted" });
});
 
// -------------------- COURSES CRUD --------------------
app.get("/courses", async (req, res) => {
  const docs = await Course.find().populate("teacherId").select(HIDE_LEGACY_ID);
  res.json(docs);
});
 
app.get("/courses/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "course _id");
  if (!id) return;
 
  const doc = await Course.findById(id).populate("teacherId").select(HIDE_LEGACY_ID);
  if (!doc) return res.status(404).json({ error: "Course not found" });
 
  res.json(doc);
});
 
app.post("/courses", async (req, res) => {
  const { code, name, teacherId, semester, room, schedule } = req.body;
  if (!code || !name || !teacherId || !semester || !room) {
    return res.status(400).json({ error: "Missing required fields" });
  }
 
  const tId = requireObjectId(teacherId, res, "teacherId");
  if (!tId) return;
 
  const teacherExists = await Teacher.exists({ _id: tId });
  if (!teacherExists) return res.status(400).json({ error: "teacherId does not match a teacher" });
 
  const created = await Course.create({
    code,
    name,
    teacherId: tId,
    semester,
    room,
    schedule: schedule ?? "",
  });
 
  res.status(201).json(created);
});
 
app.put("/courses/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "course _id");
  if (!id) return;
 
  const update = pickAllowed(req.body, ["code", "name", "teacherId", "semester", "room", "schedule"]);
  if (Object.keys(update).length === 0) return res.status(400).json({ error: "No valid fields to update" });
 
  if (update.teacherId !== undefined) {
    const tId = requireObjectId(update.teacherId, res, "teacherId");
    if (!tId) return;
 
    const teacherExists = await Teacher.exists({ _id: tId });
    if (!teacherExists) return res.status(400).json({ error: "teacherId does not match a teacher" });
 
    update.teacherId = tId;
  }
 
  const updated = await Course.findByIdAndUpdate(id, update, { new: true, runValidators: true }).select(HIDE_LEGACY_ID);
  if (!updated) return res.status(404).json({ error: "Course not found" });
 
  res.json(updated);
});
 
app.delete("/courses/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "course _id");
  if (!id) return;
 
  const hasTests = await Test.exists({ courseId: id });
  if (hasTests) return res.status(400).json({ error: "Cannot delete course that has tests" });
 
  const deleted = await Course.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Course not found" });
 
  res.json({ message: "Course deleted" });
});
 
// -------------------- STUDENTS CRUD --------------------
app.get("/students", async (req, res) => {
  const docs = await Student.find().select(HIDE_LEGACY_ID);
  res.json(docs);
});
 
app.get("/students/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "student _id");
  if (!id) return;
 
  const doc = await Student.findById(id).select(HIDE_LEGACY_ID);
  if (!doc) return res.status(404).json({ error: "Student not found" });
 
  res.json(doc);
});
 
app.post("/students", async (req, res) => {
  try {
    const { firstName, lastName, grade, studentNumber, homeroom } = req.body;
 
    if (!firstName || !lastName || grade === undefined || !studentNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }
 
    const created = await Student.create({
      firstName,
      lastName,
      grade: Number(grade),
      studentNumber,
      homeroom: homeroom ?? "",
    });
 
    return res.status(201).json(created);
  } catch (err) {
    // most common: duplicate unique key (studentNumber already exists)
    if (err?.code === 11000) {
      return res.status(409).json({
        error: "Duplicate value",
        details: err.keyValue, // tells you which field duplicated
      });
    }
 
    return res.status(500).json({ error: err.message });
  }
});
 
 
app.put("/students/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "student _id");
  if (!id) return;
 
  const update = pickAllowed(req.body, ["firstName", "lastName", "grade", "studentNumber", "homeroom"]);
  if (Object.keys(update).length === 0) return res.status(400).json({ error: "No valid fields to update" });
  if (update.grade !== undefined) update.grade = Number(update.grade);
 
  const updated = await Student.findByIdAndUpdate(id, update, { new: true, runValidators: true }).select(HIDE_LEGACY_ID);
  if (!updated) return res.status(404).json({ error: "Student not found" });
 
  res.json(updated);
});
 
app.delete("/students/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "student _id");
  if (!id) return;
 
  const hasTests = await Test.exists({ studentId: id });
  if (hasTests) return res.status(400).json({ error: "Cannot delete student that still has tests" });
 
  const deleted = await Student.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Student not found" });
 
  res.json({ message: "Student deleted" });
});
 
// -------------------- TESTS CRUD --------------------
app.get("/tests", async (req, res) => {
  const docs = await Test.find()
    .populate("studentId")
    .populate("courseId")
    .select(HIDE_LEGACY_ID);
  res.json(docs);
});
 
app.get("/tests/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "test _id");
  if (!id) return;
 
  const doc = await Test.findById(id)
    .populate("studentId")
    .populate("courseId")
    .select(HIDE_LEGACY_ID);
 
  if (!doc) return res.status(404).json({ error: "Test not found" });
  res.json(doc);
});
 
app.post("/tests", async (req, res) => {
  const { studentId, courseId, testName, date, mark, outOf, weight } = req.body;
 
  if (!studentId || !courseId || !testName || !date || mark === undefined || outOf === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }
 
  const sId = requireObjectId(studentId, res, "studentId");
  if (!sId) return;
  const cId = requireObjectId(courseId, res, "courseId");
  if (!cId) return;
 
  const studentExists = await Student.exists({ _id: sId });
  const courseExists = await Course.exists({ _id: cId });
  if (!studentExists || !courseExists) {
    return res.status(400).json({ error: "studentId or courseId does not match an existing record" });
  }
 
  const created = await Test.create({
    studentId: sId,
    courseId: cId,
    testName,
    date,
    mark: Number(mark),
    outOf: Number(outOf),
    weight: weight !== undefined ? Number(weight) : 0,
  });
 
  res.status(201).json(created);
});
 
app.put("/tests/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "test _id");
  if (!id) return;
 
  const update = pickAllowed(req.body, ["studentId", "courseId", "testName", "date", "mark", "outOf", "weight"]);
  if (Object.keys(update).length === 0) return res.status(400).json({ error: "No valid fields to update" });
 
  if (update.studentId !== undefined) {
    const sId = requireObjectId(update.studentId, res, "studentId");
    if (!sId) return;
    const ok = await Student.exists({ _id: sId });
    if (!ok) return res.status(400).json({ error: "studentId does not match a student" });
    update.studentId = sId;
  }
 
  if (update.courseId !== undefined) {
    const cId = requireObjectId(update.courseId, res, "courseId");
    if (!cId) return;
    const ok = await Course.exists({ _id: cId });
    if (!ok) return res.status(400).json({ error: "courseId does not match a course" });
    update.courseId = cId;
  }
 
  if (update.mark !== undefined) update.mark = Number(update.mark);
  if (update.outOf !== undefined) update.outOf = Number(update.outOf);
  if (update.weight !== undefined) update.weight = Number(update.weight);
 
  const updated = await Test.findByIdAndUpdate(id, update, { new: true, runValidators: true }).select(HIDE_LEGACY_ID);
  if (!updated) return res.status(404).json({ error: "Test not found" });
 
  res.json(updated);
});
 
app.delete("/tests/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "test _id");
  if (!id) return;
 
  const deleted = await Test.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Test not found" });
 
  res.json({ message: "Test deleted" });
});
 
// -------------------- EXTRA ROUTES --------------------
app.get("/students/:id/tests", async (req, res) => {
  const studentId = requireObjectId(req.params.id, res, "student _id");
  if (!studentId) return;
 
  const exists = await Student.exists({ _id: studentId });
  if (!exists) return res.status(404).json({ error: "Student not found" });
 
  const tests = await Test.find({ studentId }).populate("courseId").select(HIDE_LEGACY_ID);
  res.json(tests);
});
 
app.get("/courses/:id/tests", async (req, res) => {
  const courseId = requireObjectId(req.params.id, res, "course _id");
  if (!courseId) return;
 
  const exists = await Course.exists({ _id: courseId });
  if (!exists) return res.status(404).json({ error: "Course not found" });
 
  const tests = await Test.find({ courseId }).populate("studentId").select(HIDE_LEGACY_ID);
  res.json(tests);
});
 
app.get("/students/:id/average", async (req, res) => {
  const studentId = requireObjectId(req.params.id, res, "student _id");
  if (!studentId) return;
 
  const exists = await Student.exists({ _id: studentId });
  if (!exists) return res.status(404).json({ error: "Student not found" });
 
  const tests = await Test.find({ studentId });
  if (tests.length === 0) return res.json({ studentId, testCount: 0, averagePercent: 0 });
 
  let sum = 0;
  for (const t of tests) sum += t.outOf === 0 ? 0 : (t.mark / t.outOf) * 100;
  res.json({ studentId, testCount: tests.length, averagePercent: sum / tests.length });
});
 
app.get("/courses/:id/average", async (req, res) => {
  const courseId = requireObjectId(req.params.id, res, "course _id");
  if (!courseId) return;
 
  const exists = await Course.exists({ _id: courseId });
  if (!exists) return res.status(404).json({ error: "Course not found" });
 
  const tests = await Test.find({ courseId });
  if (tests.length === 0) return res.json({ courseId, testCount: 0, averagePercent: 0 });
 
  let sum = 0;
  for (const t of tests) sum += t.outOf === 0 ? 0 : (t.mark / t.outOf) * 100;
  res.json({ courseId, testCount: tests.length, averagePercent: sum / tests.length });
});
 
// -------------------- START --------------------
const PORT = process.env.PORT || 3000;
 
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server listening on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  });
 