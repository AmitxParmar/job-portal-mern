import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppliedJobs from "./components/Dashboard/Settings/AppliedJobs";
import Navbar from "./components/Dashboard/common/Navbar";
import AdminDashboard from "./pages/AdminDashboard";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/Dashboard/Settings/Profile";
import Settings from "./components/Dashboard/Settings";
import JobListings from "./components/Dashboard/JobListings";

function App() {
  return (
    <Router>
      <div className="max-h-screen h-screen min-h-screen flex flex-col max-w-[1980px] mx-auto justify-start">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="employer" element={<AdminDashboard />} />
            <Route index element={<JobListings />} />
          </Route>
          <Route path="/dashboard/settings/*" element={<Settings />}>
            <Route index element={<Profile />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
