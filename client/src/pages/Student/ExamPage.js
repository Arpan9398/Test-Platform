// src/pages/student/ExamPage.js
import React, { useState, useEffect } from "react";
import "./ExamPage.css";

const questions = [
  {
    id: "q1",
    questionText: "Newton’s First Law of Motion is also known as:",
    options: ["Law of force", "Law of inertia", "Law of energy", "Law of acceleration"],
    correctAnswer: 1,//this is the index value i mean if we hit 1 the correct answer is 2nd option
  },
  {
    id: "q2",
    questionText: "The value of acceleration due to gravity on Earth is:",
    options: ["8.9 m/s²", "10 m/s²", "9.8 m/s²", "11.2 m/s²"],
    correctAnswer: 2,
  },
  {
    id: "q3",
    questionText: "According to the law of conservation of energy:",
    options: [
      "Energy is created from matter",
      "Energy can be destroyed",
      "Energy remains constant in an isolated system",
      "Energy is stored in atoms only",
    ],
    correctAnswer: 2,
  },
  {
    id: "q4",
    questionText: "Ohm's Law is represented as:",
    options: [
      " V = IR ",
      "V = I/R",
      "V = R/I",
      " V = I²R",
    ],
    correctAnswer: 0,
  },
  {
    id: "q5",
    questionText: "Which of the following is a scalar quantity?",
    options: [
      "Velocity",
      "Force",
      "Displacement",
      "Speed",
    ],
    correctAnswer: 3,
  },
  {
    id: "q6",
    questionText: "The SI unit of Work is:",
    options: [
      "Newton",
      "Watt",
      "Joule ",
      "Erg",
    ],
    correctAnswer: 2,
  },
  {
    id: "q7",
    questionText: "The kinetic energy of a body depends on:",
    options: [
      "Only mass",
      "Only velocity",
      "Both mass and velocity ",
      "Only displacement",
    ],
    correctAnswer: 2,
  },
  {
    id: "q8",
    questionText: "Archimedes' Principle is related to:",
    options: [
      "Gravitation",
      " Buoyancy ",
      "Friction",
      "Pressure",
    ],
    correctAnswer: 1,
  },
  {
    id: "q9",
    questionText: "Refraction occurs when:",
    options: [
      " Light is reflected",
      " Light is absorbed",
      "Light passes from one medium to another",
      " Light hits a mirror",
    ],
    correctAnswer: 2,
  },
  {
    id: "q10",
    questionText: "The unit of frequency is:",
    options: [
      "Decibel",
      "Second ",
      "Hertz",
      "Watt",
    ],
    correctAnswer: 2,
  },
  {
    id: "q11",
    questionText: "Which of the following is a longitudinal wave?",
    options: [
      "Light",
      "X-ray",
      "Water wave",
      "Sound wave",
    ],
    correctAnswer: 3,
  },
   {
    id: "q12",
    questionText: "Resonance occurs when:",
    options: [
      "Frequency of source < natural frequency",
      "Source and natural frequencies are equal ",
      "No vibration",
      "Frequency of source > natural frequency",
    ],
    correctAnswer: 1,
  },
   {
    id: "q13",
    questionText: "The specific heat capacity unit is:",
    options: [
      "J/kg·°C",
      "J/kg",
      "J/m²·s",
      "N/kg",
    ],
    correctAnswer: 0,
  },
   {
    id: "q14",
    questionText: "Latent heat causes:",
    options: [
      "A rise in temperature",
      "A decrease in mass",
      "Change in state",
      "Loss of energy",
    ],
    correctAnswer: 2,
  },
   {
    id: "q15",
    questionText: "Doppler Effect is observed when:",
    options: [
      "A wave hits a mirror",
      "Observer and source are stationary",
      "Observer or source is moving ",
      "Light is absorbed",
    ],
    correctAnswer: 2,
  },
   {
    id: "q16",
    questionText: "Magnetic field lines always emerge from:",
    options: [
      "South to North",
      "Center of magnet",
      "North to South outside the magnet",
      "South to North outside the magnet",
    ],
    correctAnswer: 2,
  },
   {
    id: "q17",
    questionText: "Coulomb’s Law involves:",
    options: [
      "Mass and distance",
      "Voltage and current",
      "Charge and distance",
      "Power and resistance",
    ],
    correctAnswer: 2,
  },
   {
    id: "q18",
    questionText: "The unit of electric potential is:",
    options: [
      "Ohm",
      "Ampere",
      "Watt",
      "Volt ",
    ],
    correctAnswer: 3,
  },
   {
    id: "q19",
    questionText: "A concave lens is also known as:",
    options: [
      "Converging lens",
      "Diverging lens",
      "Cylindrical lens",
      "Plane lens",
    ],
    correctAnswer: 1,
  },
   {
    id: "q20",
    questionText: "Half-life is related to:",
    options: [
      "Reflection",
      "Refraction",
      "Radioactivity",
      "Thermodynamics",
    ],
    correctAnswer: 2,
  },
   {
    id: "q21",
    questionText: "The escape velocity from Earth is approximately:",
    options: [
      "9.8 m/s",
      "7.9 km/s",
      "11.2 km/s",
      "5 km/s",
    ],
    correctAnswer: 2,
  },
   {
    id: "q22",
    questionText: "Momentum is defined as:",
    options: [
      "m + v",
      "m/v",
      "mv ",
      "v/m",
    ],
    correctAnswer: 2,
  },
   {
    id: "q23",
    questionText: "Power is the rate of:",
    options: [
      "Energy loss",
      "Work done ",
      "Force applied",
      "Displacement",
    ],
    correctAnswer: 2,
  },
   {
    id: "q24",
    questionText: "Diffraction is the:",
    options: [
      "Reflection of light",
      "Absorption of light",
      "Bending of light around obstacles",
      "Scattering of light",
    ],
    correctAnswer: 2,
  },
   {
    id: "q25",
    questionText: "Conductors differ from insulators by:",
    options: [
      "Allowing current to flow",
      "Having more mass",
      " Being lighter",
      "Not heating up",
    ],
    correctAnswer: 0,
  },
];

const ExamPage = () => {
  const [currentQnIndex, setCurrentQnIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleOptionChange = (idx) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQnIndex]: idx,
    }));
  };

  const updateQuestionStatus = (index) => {
    setSubmittedQuestions((prev) => ({
      ...prev,
      [index]: selectedOptions[index] !== undefined ? "answered" : "not-answered",
    }));
  };

  const saveAndNext = () => {
    updateQuestionStatus(currentQnIndex);
    setCurrentQnIndex((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
  };

  const markForReview = () => {
    updateQuestionStatus(currentQnIndex);
    setCurrentQnIndex((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
  };

  const clearAnswer = () => {
    setSelectedOptions((prev) => {
      const updated = { ...prev };
      delete updated[currentQnIndex];
      return updated;
    });
    setSubmittedQuestions((prev) => ({
      ...prev,
      [currentQnIndex]: "not-answered",
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.correctAnswer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  return (
    <div className="exam-wrapper">
      {/* Header */}
      <div className="exam-header">
        <div className="logo-area">
          <img src="/nta.jpeg" alt="NTA Logo" className="nta-logo" />
        </div>
        <div className="exam-info">
          <p>
            Candidate Name: <strong>Arpan</strong>
          </p>
          <p>Exam Name: JEE-Main</p>
          <p>Subject Name: Physics</p>
          <p>
            Remaining Time: <span className="timer">{formatTime(timeLeft)}</span>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="exam-body">
        {/* Question Area */}
        <div className="question-panel">
          {!submitted ? (
            <>
              <h3>Question {currentQnIndex + 1}:</h3>
              <p>{questions[currentQnIndex].questionText}</p>
              <ul className="options">
                {questions[currentQnIndex].options.map((opt, idx) => (
                  <li key={idx}>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value={idx}
                        checked={selectedOptions[currentQnIndex] === idx}
                        onChange={() => handleOptionChange(idx)}
                      />
                      {opt}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="actions">
                <button className="btn green" onClick={saveAndNext}>
                  Save & Next
                </button>
                <button className="btn orange" onClick={markForReview}>
                  Save & Mark for Review
                </button>
                <button className="btn blue" onClick={markForReview}>
                  Mark for Review & Next
                </button>
                <button className="btn gray" onClick={clearAnswer}>
                  Clear
                </button>
                <button className="btn submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </>
          ) : (
            <div className="result">
              <h2>Exam Submitted!</h2>
              <p>
                Your Score: <strong>{score} / {questions.length}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="side-panel">
          <div className="legend">
            <p>
              <span className="box gray" /> Not Visited
            </p>
            <p>
              <span className="box red" /> Not Answered
            </p>
            <p>
              <span className="box green" /> Answered
            </p>
          </div>

          <div className="question-numbers">
            {questions.map((_, i) => {
              const status = submittedQuestions[i];
              let className = "qnum";

              if (status === "answered") className += " green";
              else if (status === "not-answered") className += " red";
              else className += " gray";

              if (i === currentQnIndex) className += " active";

              return (
                <div
                  key={i}
                  className={className}
                  onClick={() => setCurrentQnIndex(i)}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
