// src/pages/student/StudentDashboard.js
import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const dummyTest = {
    id: "12345",
    title: "JavaScript Basics Test",
    description: "A test covering JavaScript fundamentals like variables, loops, and functions.",
    duration: "3 hrs",
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📚 Available Tests</h2>

      <div style={styles.card}>
        <h3 style={styles.title}>{dummyTest.title}</h3>
        <p style={styles.description}>{dummyTest.description}</p>
        <p style={styles.duration}><strong>Duration:</strong> {dummyTest.duration}</p>

        <Link to={`/exam/${dummyTest.id}`} style={styles.button}>
          Take Test
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "sans-serif",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "600px",
  },
  title: {
    fontSize: "1.4rem",
    marginBottom: "0.5rem",
  },
  description: {
    marginBottom: "0.8rem",
    color: "#555",
  },
  duration: {
    marginBottom: "1rem",
    fontWeight: "500",
  },
  button: {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
    display: "inline-block",
    marginTop: "0.5rem",
  },
};

export default StudentDashboard;
