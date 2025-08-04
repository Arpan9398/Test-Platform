import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TestResult.css"; // CSS file

function TestResult() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user || !user._id) {
      console.warn("No user found or user._id missing:", user);
      alert("User not logged in. Redirecting to login...");
      navigate("/login");
      return;
    }

    const fetchResultAndTest = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/results/${user._id}/${testId}`);
        setResult(res.data);

        const testRes = await axios.get(`http://localhost:5000/api/tests/${testId}`);
        setTest(testRes.data);

        setLoading(false);
      } catch (error) {
        console.error("❌ Error loading test/result:", error?.response?.data || error.message);
        alert("Unable to load test or result. Please check the test ID and login again.");
        setLoading(false);
      }
    };

    fetchResultAndTest();
  }, [testId, user, navigate]);

  if (loading) return <p className="loading">Loading result...</p>;
  if (!result || !test) return <p className="error">No result or test data found.</p>;

  return (
    <div className="result-container">
      <h2 className="test-title">📊 Result for: {test.title}</h2>
      <div className="user-info">
        <p><strong>Student:</strong> {user?.name || "Unknown"}</p>
        <p><strong>Submitted At:</strong> {new Date(result.submittedAt).toLocaleString()}</p>
        <h3 className="score">✅ Score: {result.score} / {test.questions.length}</h3>
      </div>

      <ul className="questions-list">
        {test.questions.map((q, idx) => {
          const qIdStr = q._id.toString();
          const selectedIdx = result.answers[qIdStr];
          const correctIdx = q.correctAnswerIndex;

          const selectedText =
            typeof selectedIdx === "number" ? q.options[selectedIdx] : "Not Answered";
          const correctText =
            typeof correctIdx === "number" ? q.options[correctIdx] : "N/A";

          const isCorrect = selectedIdx === correctIdx;

          return (
            <li key={q._id} className={`question-card ${isCorrect ? "correct" : "incorrect"}`}>
              <p><strong>Q{idx + 1}:</strong> {q.questionText}</p>
              <p>✅ <strong>Correct Answer:</strong> {correctText}</p>
              <p>🧠 <strong>Your Answer:</strong> {selectedText}</p>
              <p className="result-status">{isCorrect ? "✔️ Correct" : "❌ Incorrect"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TestResult;
