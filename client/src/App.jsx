import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import AppliedJobs from "./components/Dashboard/Settings/AppliedJobs";
import Profile from "./components/Dashboard/Settings/Profile";
import Settings from "./components/Dashboard/Settings";
import Layout from "./components/Dashboard/common/Layouts/Layout";

import Bookmarks from "./components/Dashboard/Settings/Bookmarks";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginRegisterLayout from "./components/Dashboard/common/Layouts/LoginRegisterLayout";
import Navbar from "./components/Dashboard/common/Navbar";

function App() {
  const role = "jobSeeker"; // jobSeeker or employer
  const isAuth = false;
  return (
    <Router>
      <div className="">
        <Navbar isAuth={isAuth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <Layout userRole={role}>
                <Dashboard userRole={role} />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout userRole={role}>
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

          <Route
            path="*"
            element={
              <div className="h-screen w-screen bg-black">
                <p className="m-auto border-b-4 border-border">
                  Error: No Route Found!
                </p>{" "}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
