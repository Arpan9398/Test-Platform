import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [results, setResults] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/all-results");
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    const fetchTests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tests");
        setTests(res.data);
      } catch (err) {
        console.error("Error fetching tests:", err);
      }
    };

    fetchResults();
    fetchTests();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <style>
        {`
          h2, h3 {
            color: #333;
            margin-bottom: 10px;
          }

          .create-link {
            display: inline-block;
            padding: 10px 16px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-bottom: 20px;
          }

          .create-link:hover {
            background-color: #0056b3;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }

          th {
            background-color: #f2f2f2;
            color: #333;
            font-weight: bold;
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
          }

          td {
            padding: 10px;
            border: 1px solid #ddd;
          }

          tr:nth-child(even) {
            background-color: #fafafa;
          }

          p {
            color: #555;
            margin-top: 8px;
          }
        `}
      </style>

      <h2>🛠️ Admin Dashboard</h2>

      <Link className="create-link" to="create-test">➕ Create New Test</Link>

      <h3>📝 Available Tests</h3>
      {tests.length === 0 ? (
        <p>No tests created yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration (minutes)</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test._id}>
                <td>{test.title}</td>
                <td>{test.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 style={{ marginTop: "30px" }}>📊 Student Scores</h3>
      {results.length === 0 ? (
        <p>No results available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Test Title</th>
              <th>Duration (min)</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r._id}>
                <td>{r.studentId?.name}</td>
                <td>{r.studentId?.email}</td>
                <td>{r.testId?.title}</td>
                <td>{r.testId?.duration}</td>
                <td>{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
