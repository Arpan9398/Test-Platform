// src/pages/student/QuestionPage.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const questions = [
  {
    id: "q1",
    questionText: "A person standing on an open ground hears the sound...",
    options: ["v", "v/2", "√3/2 v", "v√2"],
  },
  {
    id: "q2",
    questionText: "What is the SI unit of force?",
    options: ["Newton", "Pascal", "Joule", "Watt"],
  },
  {
    id: "q3",
    questionText: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome"],
  },
];

const QuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const index = parseInt(id, 10);
  const question = questions[index];

  if (!question) return <p>Question not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Question {index + 1}</h2>
      <p>{question.questionText}</p>
      <ul>
        {question.options.map((opt, i) => (
          <li key={i}>
            <input type="radio" name={`q${index}`} id={`opt${i}`} />
            <label htmlFor={`opt${i}`}>{opt}</label>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate(`/exam/question/${index - 1}`)} disabled={index === 0}>
        Prev
      </button>
      <button onClick={() => navigate(`/exam/question/${index + 1}`)} disabled={index === questions.length - 1}>
        Next
      </button>
    </div>
  );
};

export default QuestionPage;
