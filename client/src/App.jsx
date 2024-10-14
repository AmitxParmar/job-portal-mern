import { Route, Routes, Navigate } from "react-router-dom";
import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { Suspense } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EmployerDashboard from "@/components/Dashboard/EmployerComponents/EmployerDashboard";
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
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) navigate(`/dashboard/${user?.role}`);
  }, [isAuthenticated]);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const RoleBasedRoute = ({ children, allowedRole }) => {
    if (isAuthenticated && user?.role !== allowedRole) {
      return <Navigate to="/unauthorized" replace />; // Handle unauthorized
    }
    return children;
  };

  return (
    <Suspense
      fallback={
        <div className="absolute h-screen w-screen blur">
          <Loader />
        </div>
      }
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<LoginRegisterLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRole={user?.role}>
                <Layout role={user?.role} />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to={`/dashboard/${user?.role}`} replace />}
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

          <Route path="settings" element={<Settings />}>
            <Route index element={<Profile />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
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
    </Suspense>
  );
}

export default App;
