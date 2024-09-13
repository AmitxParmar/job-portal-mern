import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Dashboard/Profile";
import AppliedJobs from "./components/Dashboard/AppliedJobs";
import Navbar from "./components/Dashboard/Navbar";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="max-h-screen h-screen flex flex-col max-w-[1980px] mx-auto">
        <Navbar />

        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route index path="employer" element={<AdminDashboard />} />
          </Route>
          <Route path="applied-jobs" element={<AppliedJobs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
