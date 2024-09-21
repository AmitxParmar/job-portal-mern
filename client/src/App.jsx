import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import AppliedJobs from "./components/Dashboard/Settings/AppliedJobs";
import Profile from "./components/Dashboard/Settings/Profile";
import Settings from "./components/Dashboard/Settings";
import Layout from "./components/Dashboard/common/Layout";

import Bookmarks from "./components/Dashboard/Settings/Bookmarks";

function App() {
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
              <Layout>
                <Settings />
              </Layout>
            }
          >
            <Route index element={<Profile />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
