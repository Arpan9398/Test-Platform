  const mongoose = require("mongoose");

  const ResultSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    testId: { type: String, required: true },
    answers: { type: Object, required: true },
    submittedAt: { type: Date, default: Date.now },
    score: { type: Number } // ✅ Add this if you're storing score
  });

  module.exports = mongoose.model("Result", ResultSchema);
