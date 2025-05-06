import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from "./components/custom/dashboard/Dashboard";
import StudentsList from "./components/custom/students-list/StudentsList";
import AddStudent from "./components/custom/add-student/AddStudent";
import IssueBook from "./components/custom/issue-book/IssueBook";
import ReturnBook from "./components/custom/return-book/ReturnBook";
import Analytics from "./components/custom/analytics/Analytics";
import Chart from "./components/custom/chart/Chart";
import AddBook from "./components/custom/add-book/AddBook";
import EditBook from "./components/custom/edit-book/EditBook";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/addBook" element={<AddBook/>}/>
        <Route path="/editBook" element={<EditBook/>}/>
        <Route path="/studentsList" element={<StudentsList/>}/>
        <Route path="/addStudent" element={<AddStudent/>}/>
        <Route path="/issueBook" element={<IssueBook/>}/>
        <Route path="/returnBook" element={<ReturnBook/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/chart" element={<Chart/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
