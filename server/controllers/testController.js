const Test = require('../models/Test');

// Create new test
exports.createTest = async (req, res) => {
  try {
    const { title, duration, questions } = req.body;
    const newTest = new Test({ title, duration, questions });
    await newTest.save();
    res.status(201).json({ message: 'Test created successfully', test: newTest });
  } catch (error) {
    console.error('Error creating test:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
