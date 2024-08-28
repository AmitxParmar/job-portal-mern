const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // Assuming you have a User model

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Require Admin Role!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to validate user role" });
  }
};

module.exports = { verifyToken, isAdmin };
