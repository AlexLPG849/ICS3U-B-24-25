require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

// Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  address: String,
  username: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("https://ics3u-b-24-25.onrender.com/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("https://ics3u-b-24-25.onrender.com/api/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.delete("https://ics3u-b-24-25.onrender.com/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Serve homepage
app.get("https://ics3u-b-24-25.onrender.com/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});