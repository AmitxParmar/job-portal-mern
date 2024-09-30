import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AppliedJobs from "./components/Dashboard/Settings/AppliedJobs";
import Bookmarks from "./components/Dashboard/Settings/Bookmarks";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./components/Dashboard/common/Layouts/Layout";
import Login from "./pages/Login";
import LoginRegisterLayout from "./components/Dashboard/common/Layouts/LoginRegisterLayout";
import Navbar from "./components/Dashboard/common/Navbar";
import { Navigate } from "react-router-dom";
import Profile from "./components/Dashboard/Settings/Profile";
import Register from "./pages/Register";
import Settings from "./components/Dashboard/Settings";

function App() {
  const role = "jobSeeker"; // jobSeeker or employer
  const isAuth = true;
  return (
    <Router>
      <div className="">
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
      </div>
    </Router>
  );
}

export default App;
