import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AppliedJobs from "./components/Dashboard/Settings/AppliedJobs";
import Bookmarks from "./components/Dashboard/Settings/Bookmarks";
import { CircleAlert } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { CircleX } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { Info } from "lucide-react";
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

function App() {
  const role = "jobSeeker"; // jobSeeker or employer
  const isAuth = true;
  return (
    <Router>
      <Navbar role={role} isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Layout role={role}>
              <Dashboard role={role} />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout role={role}>
              <Settings />
            </Layout>
          }
        >
          <Route index element={<Profile />} />
          <Route path="applied-jobs" element={<AppliedJobs />} />
          <Route path="bookmarks" element={<Bookmarks />} />
        </Route>
        <Route
          path="/login"
          element={
            <LoginRegisterLayout>
              <Login />
            </LoginRegisterLayout>
          }
        />
        <Route
          path="/register"
          element={
            <LoginRegisterLayout>
              <Register />
            </LoginRegisterLayout>
          }
        />

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
