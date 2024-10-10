import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EmployerDashboard from "@/components/Dashboard/EmployerDashboard";
import UserJobListings from "@/components/Dashboard/JobListings";
import JobOpenings from "./components/Dashboard/EmployerComponents/JobOpenings";
import Settings from "./components/Dashboard/Settings";
import Profile from "./components/Dashboard/Settings/Profile";
import AppliedJobs from "./components/Dashboard/Settings/AppliedJobs";
import Bookmarks from "./components/Dashboard/Settings/Bookmarks";

import Layout from "./components/Dashboard/common/Layouts/Layout";
import LoginRegisterLayout from "./components/Dashboard/common/Layouts/LoginRegisterLayout";
import Navbar from "./components/Dashboard/common/Navbar";
import Loader from "./components/Dashboard/common/Loader";

function App() {
  const role = "recruiter"; // or "jobSeeker"
  const isAuth = true;

  return (
    <Router>
      <Navbar role={role} isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Layout role={role} />}>
          <Route
            index
            element={<Navigate to={`/dashboard/${role}`} replace />}
          />

          <Route path="jobSeeker" element={<Dashboard role="jobSeeker" />}>
            <Route index element={<UserJobListings />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>

          <Route path="recruiter" element={<Dashboard role="recruiter" />}>
            <Route index element={<EmployerDashboard />} />
            <Route path="job-openings" element={<JobOpenings />} />
          </Route>

          {/* Common settings route accessible to both roles */}
          <Route path="settings" element={<Settings />}>
            <Route index element={<Profile />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
          </Route>
        </Route>

        <Route element={<LoginRegisterLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
