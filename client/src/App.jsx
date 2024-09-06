import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Dashboard/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
