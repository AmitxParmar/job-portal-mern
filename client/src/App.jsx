import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import AppliedJobs from "./components/Dashboard/Settings/AppliedJobs";
import Profile from "./components/Dashboard/Settings/Profile";
import Settings from "./components/Dashboard/Settings";
import Layout from "./components/Dashboard/common/Layout";

import Bookmarks from "./components/Dashboard/Settings/Bookmarks";
import { useEffect } from "react";
import { loginUser } from "./services/authServices";

function App() {
  /*  useEffect(() => {
    const login = async () => {
      return await loginUser("amitparmar901@gmail.com", "1212");
    };
    const { data } = login();
    console.log("loginnnnnnnnnnnnn", data);
  }, []); // This will run only once on load */
  const role = "employer"; // jobSeeker or employer
  return (
    <Router>
      <div className="">
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
