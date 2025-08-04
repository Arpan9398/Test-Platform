import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Correct import paths
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/Student/Dashboard";

import AdminDashboard from "./pages/admin/Dashboard";
import ExamPage from "./pages//Student/ExamPage";
import QuestionPage from "./pages//Student/Questionpage";
import CreateTest from "./pages/admin/CreateTest";
import TestResult from "./pages/Student/TestResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/home" element={<StudentDashboard />}  />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/exam/:testId" element={<ExamPage />} />
        <Route path="/exam/question/:id" element={<QuestionPage />} />
        <Route path="/admin-dashboard/create-test" element={<CreateTest />} />
        <Route path="/test-result/:testId" element={<TestResult />} />
        <Route path="/student-result" element={<TestResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
