import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Dashboard/Profile";
import AppliedJobs from "./components/Dashboard/AppliedJobs";
import Navbar from "./components/Dashboard/Navbar";

function App() {
  return (
    <Router>
      <div className="max-h-screen">
        <Navbar />
        <div className="max-h-[calc(100vh-9vh)] overflow-hidden">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="applied-jobs" element={<AppliedJobs />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
