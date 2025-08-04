// File: src/pages/admin/CreateTest.js

import React, { useState } from "react";
import axios from "axios";
import "./CreateTest.css"; // Make sure your CSS is in this path
import { data } from "react-router-dom";

const CreateTest = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "questionText") {
      updatedQuestions[index][field] = value;
    } else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.split("-")[1]);
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === "correctAnswerIndex") {
      updatedQuestions[index][field] = parseInt(value);
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
    ]);
  };

  const deleteQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin-dashboard/create-test", // ✅ Match your Express route
        { title, duration, questions }
      );

      alert("✅ Test created successfully!");
      setTitle("");
      setDuration("");
      setQuestions([{ questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0 }]);
    } catch (err) {
      console.error("Error creating test:", err);
      alert("❌ Failed to create test. Check console.");
    }
  };

  return (
    <div className="create-test-container">
      <h2>Create Test</h2>
      <form onSubmit={handleSubmit} className="create-test-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            placeholder="Test Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Duration (minutes):</label>
          <input
            type="number"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <h3>Questions:</h3>
        {questions.map((q, index) => (
          <div className="question-block" key={index}>
            <label>Question {index + 1}:</label>
            <input
              type="text"
              placeholder="Enter question"
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(index, "questionText", e.target.value)
              }
              required
            />

            {q.options.map((opt, optIndex) => (
              <input
                key={optIndex}
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={opt}
                onChange={(e) =>
                  handleQuestionChange(index, `option-${optIndex}`, e.target.value)
                }
                required
              />
            ))}

            <select
              value={q.correctAnswerIndex}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswerIndex", e.target.value)
              }
              required
            >
              <option value={0}>Correct Option: 1</option>
              <option value={1}>Correct Option: 2</option>
              <option value={2}>Correct Option: 3</option>
              <option value={3}>Correct Option: 4</option>
            </select>

            <button
              type="button"
              className="delete-btn"
              onClick={() => deleteQuestion(index)}
              disabled={questions.length === 1}
            >
              Delete Question
            </button>
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addQuestion}>
          ➕ Add Question
        </button>

        <button type="submit" className="submit-btn">
          ✅ Create Test
        </button>
      </form>
    </div>
  );
};

export default CreateTest;
