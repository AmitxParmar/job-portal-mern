import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AppliedJobs from "./components/Dashboard/Settings/AppliedJobs";
import Bookmarks from "./components/Dashboard/Settings/Bookmarks";
import { CircleAlert } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { CircleX } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import EmployerDashboard from "@/components/Dashboard/EmployerDashboard";
import Home from "./pages/Home";
import { Info } from "lucide-react";
import JobOpenings from "./components/Dashboard/EmployerComponents/JobOpenings";
import Layout from "./components/Dashboard/common/Layouts/Layout";
import Loader from "./components/Dashboard/common/Loader";
import Login from "./pages/Login";
import LoginRegisterLayout from "./components/Dashboard/common/Layouts/LoginRegisterLayout";
import Navbar from "./components/Dashboard/common/Navbar";
import { Navigate } from "react-router-dom";
import Profile from "./components/Dashboard/Settings/Profile";
import Register from "./pages/Register";
import Settings from "./components/Dashboard/Settings";
import { Toaster } from "./components/ui/sonner";
import UserJobListings from "@/components/Dashboard/JobListings";

function App() {
  const role = "recruiter"; // jobSeeker or recruiter
  const isAuth = true;
  return (
    <Router>
      <Navbar role={role} isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Layout role={role} />}>
          <Route path="/dashboard" element={<Dashboard role={role} />}>
            <Route path="jobSeeker" element={<UserJobListings />} />
            <Route path="recruiter" element={<EmployerDashboard />} />
          </Route>
          <Route path="/recruiter/job-openings" element={<JobOpenings />} />
          <Route path="/settings" element={<Settings />}>
            <Route index element={<Profile />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>
        </Route>

        <Route element={<LoginRegisterLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<Navigate to={"/dashboard"} />} />
      </Routes>
      <Toaster
        icons={{
          success: <CircleCheck />,
          info: <Info />,
          warning: <CircleAlert />,
          error: <CircleX />,
          loading: <Loader />,
        }}
      />
    </Router>
  );
}

export default App;
