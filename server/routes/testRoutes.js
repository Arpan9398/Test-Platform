const express = require("express");
const router = express.Router();
const Test = require("../models/Test");
const { createTest } = require('../controllers/testController');

// ✅ GET all tests
router.get("/gettests", async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
    res.status(200).json(tests);
  } catch (err) {
    console.error("❌ Error fetching tests:", err.message);
    res.status(500).json({ error: "Server error while fetching tests" });
  }
});

// ✅ POST - Create a new test (Admin)
router.post("/tests", async (req, res) => {
  try {
    const { title, duration, questions } = req.body;

    // Basic validation
    if (!title || !duration || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: "Title, duration and non-empty questions array required." });
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.questionText || !Array.isArray(q.options) || q.options.length !== 4) {
        return res.status(400).json({ error: `Invalid question format at index ${i + 1}` });
      }

      if (
        typeof q.correctAnswerIndex !== "number" ||
        q.correctAnswerIndex < 0 ||
        q.correctAnswerIndex >= q.options.length
      ) {
        return res.status(400).json({ error: `Invalid correct answer index at question ${i + 1}` });
      }
    }

    const newTest = new Test({ title, duration, questions });
    await newTest.save();

    console.log("✅ Test created:", newTest._id);
    res.status(201).json({ message: "Test created successfully", test: newTest });
  } catch (err) {
    console.error("❌ Error creating test:", err.message);
    res.status(500).json({ error: "Server error while creating test" });
  }
});

// ✅ GET - Fetch test by ID
router.get('/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching test', error: err });
  }
});

module.exports = router;
