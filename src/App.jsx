import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/custom/dashboard/Dashboard";
import StudentsList from "./components/custom/students-list/StudentsList";
import AddStudent from "./components/custom/add-student/AddStudent";
import IssueBook from "./components/custom/issue-book/IssueBook";
import ReturnBook from "./components/custom/return-book/ReturnBook";
import Analytics from "./components/custom/analytics/Analytics";
import Chart from "./components/custom/chart/Chart";
import AddBook from "./components/custom/add-book/AddBook";
import EditBook from "./components/custom/edit-book/EditBook";
import ProtectedRoute from "./components/custom/protected-route/ProtectedRoute";
import Header from "./components/custom/header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/books/:id" element={<EditBook />} />
            <Route path="/studentsList" element={<StudentsList />} />
            <Route path="/addStudent" element={<AddStudent />} />
            <Route path="/issueBook" element={<IssueBook />} />
            <Route path="/returnBook" element={<ReturnBook />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
