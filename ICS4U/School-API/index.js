const { error } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// stuff
function loadJson(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "data", file), "utf8"));
}

function saveJson(file, data) {
  fs.writeFileSync(path.join(__dirname, "data", file), JSON.stringify(data, null, 2));
}

// Load data
let teachers = loadJson("teachers.json");
let courses = loadJson("courses.json");
let students = loadJson("students.json");
let tests = loadJson("tests.json");

// Track next IDs
let nextTeacherId = Math.max(...teachers.map(t => t.id), 0) + 1;
let nextCourseId = Math.max(...courses.map(c => c.id), 0) + 1;
let nextStudentId = Math.max(...students.map(s => s.id), 0) + 1;
let nextTestId = Math.max(...tests.map(t => t.id), 0) + 1;


// Get all Teachers
app.get("/teachers", (req, res) => res.json(teachers));
// Teacher by ID
app.get("/teachers/:id", (req, res) => {
  const teacher = teachers.find(t => t.id == req.params.id);
  if (!teacher) return res.status(404).json({ error: "Teacher not found" });
  res.json(teacher);
});
// Make new teacher
app.post("/teachers", (req, res) => {
  const { firstName, lastName, email, department, room } = req.body;
  if (!firstName || !lastName || !email || !department)
    return res.status(400).json({ error: "Missing required fields" });

  const newTeacher = {
    id: nextTeacherId++,
    firstName,
    lastName,
    email,
    department,
    room: room || ""
  };

  teachers.push(newTeacher);
  saveJson("teachers.json", teachers);

  res.status(201).json(newTeacher);
});
// Update Teacher
app.put("/teachers/:id", (req, res) => {
  const teacher = teachers.find(t => t.id == req.params.id);
  if (!teacher) return res.status(404).json({ error: "Teacher not found" });

  Object.assign(teacher, req.body);
  saveJson("teachers.json", teachers);

  res.json(teacher);
});
// Remove a Teacher
app.delete("/teachers/:id", (req, res) => {
  const teacherId = parseInt(req.params.id);

  if (courses.some(c => c.teacherId === teacherId))
    return res.status(400).json({ error: "Cannot delete teacher with assigned courses" });

  teachers = teachers.filter(t => t.id !== teacherId);
  saveJson("teachers.json", teachers);

  res.json({ message: "Deleted" });
});


// Get all courses
app.get("/courses", (req, res) => res.json(courses));
// Course by ID
app.get("/courses/:id", (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json(course);
});
// Make new course
app.post("/courses", (req, res) => {
  const { code, name, teacherId, semester, room, schedule } = req.body;

  if (!code || !name || !teacherId || !semester || !room)
    return res.status(400).json({ error: "Missing required fields" });

  if (!teachers.some(t => t.id === teacherId))
    return res.status(400).json({ error: "Invalid teacherId" });

  const newCourse = {
    id: nextCourseId++,
    code,
    name,
    teacherId,
    semester,
    room,
    schedule: schedule || ""
  };

  courses.push(newCourse);
  saveJson("courses.json", courses);

  res.status(201).json(newCourse);
});
// Update course
app.put("/courses/:id", (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ error: "Course not found" });

  if (req.body.teacherId && !teachers.some(t => t.id === req.body.teacherId))
    return res.status(400).json({ error: "Invalid teacherId" });

  Object.assign(course, req.body);
  saveJson("courses.json", courses);

  res.json(course);
});
// Delete course
app.delete("/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id);

  if (tests.some(t => t.courseId === courseId))
    return res.status(400).json({ error: "Cannot delete course with test records" });

  courses = courses.filter(c => c.id !== courseId);
  saveJson("courses.json", courses);

  res.json({ message: "Deleted" });
});


//get all students
app.get("/students", (req, res) => res.json(students));
// studnet by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});
// create new student
app.post("/students", (req, res) => {
  const { firstName, lastName, grade, studentNumber, homeroom } = req.body;
  if (!firstName || !lastName || !grade || !studentNumber)
    return res.status(400).json({ error: "Missing required fields" });

  const newStudent = {
    id: nextStudentId++,
    firstName,
    lastName,
    grade,
    studentNumber,
    homeroom: homeroom || ""
  };

  students.push(newStudent);
  saveJson("students.json", students);

  res.status(201).json(newStudent);
});
// updte student
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  Object.assign(student, req.body);
  saveJson("students.json", students);

  res.json(student);
});
// remove stdent
app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);

  if (tests.some(t => t.studentId === studentId))
    return res.status(400).json({ error: "Cannot delete student with test records" });

  students = students.filter(s => s.id !== studentId);
  saveJson("students.json", students);

  res.json({ message: "Deleted" });
});


// get all tests
app.get("/tests", (req, res) => res.json(tests));
// test by ID
app.get("/tests/:id", (req, res) => {
  const test = tests.find(t => t.id == req.params.id);
  if (!test) return res.status(404).json({ error: "Test not found" });
  res.json(test);
});
// create a test
app.post("/tests", (req, res) => {
  const { studentId, courseId, testName, date, mark, outOf, weight } = req.body;

  if (!studentId || !courseId || !testName || !date || !mark || !outOf)
    return res.status(400).json({ error: "Missing required fields" });

  if (!students.some(s => s.id === studentId))
    return res.status(400).json({ error: "Invalid studentId" });

  if (!courses.some(c => c.id === courseId))
    return res.status(400).json({ error: "Invalid courseId" });

  const newTest = {
    id: nextTestId++,
    studentId,
    courseId,
    testName,
    date,
    mark,
    outOf,
    weight: weight || 0
  };

  tests.push(newTest);
  saveJson("tests.json", tests);

  res.status(201).json(newTest);
});
// update test
app.put("/tests/:id", (req, res) => {
  const test = tests.find(t => t.id == req.params.id);
  if (!test) return res.status(404).json({ error: "Test not found" });

  if (req.body.studentId && !students.some(s => s.id === req.body.studentId))
    return res.status(400).json({ error: "Invalid studentId" });

  if (req.body.courseId && !courses.some(c => c.id === req.body.courseId))
    return res.status(400).json({ error: "Invalid courseId" });

  Object.assign(test, req.body);
  saveJson("tests.json", tests);

  res.json(test);
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// POC - list all tests for a course
app.get("/courses/:id/tests", (req, res) => {
  res.json(tests.filter(t => t.courseId == req.params.id));
});
  if (courses === -1) 
    return res.status(404).json({error: "Could not find course"});