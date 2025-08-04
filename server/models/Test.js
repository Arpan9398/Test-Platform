const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  
  questionText: String,
  options: [String],
  correctAnswerIndex: Number  // ✅ Store the correct option as index (not string)
});

const testSchema = new mongoose.Schema({
  title: String,
  duration: Number, // in minutes
  questions: [questionSchema]
});

module.exports = mongoose.model("Test", testSchema);
