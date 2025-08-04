const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const Test = require("../models/Test");
const User = require("../models/User"); // Make sure User model exists

// POST - Submit result after test
router.post("/", async (req, res) => {
  try {
    const { studentId, testId, answers } = req.body;

    if (!studentId || !testId || !answers) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    // ✅ Calculate score
    let correct = 0;
    test.questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const result = new Result({
      studentId,
      testId,
      answers,
      submittedAt: new Date(),
      score: correct,
    });

    await result.save();
    console.log("✅ Result saved:", result);
    res.status(200).json({ message: "✅ Result submitted successfully", score: correct });
  } catch (err) {
    console.error("❌ Error submitting result:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// GET result for a specific student and test
router.get("/:studentId/:testId", async (req, res) => {
  const { studentId, testId } = req.params;

  try {
    const result = await Result.findOne({ testId, studentId });
    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error fetching result:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ NEW: Get all results with user email and score for a specific test (Admin use)
router.get("/admin/test/:testId", async (req, res) => {
  try {
    const { testId } = req.params;

    const results = await Result.find({ testId })
      .populate("studentId", "email") // only populate email field
      .select("studentId score submittedAt"); // include only necessary fields

    const formattedResults = results.map((result) => ({
      email: result.studentId.email,
      score: result.score,
      submittedAt: result.submittedAt,
    }));

    res.status(200).json(formattedResults);
  } catch (err) {
    console.error("❌ Error fetching admin test results:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
