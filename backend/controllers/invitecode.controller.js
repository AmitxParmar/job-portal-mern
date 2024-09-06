import InviteCode from "../models/InviteCode.js";
import { v4 as uuidv4 } from "uuid";
import { createError } from "../utils/error.js";

// Generate a new invite code
export const generateInviteCode = async (req, res, next) => {
  try {
    const { role, email } = req.body;

    // Check if a code for this email already exists and is unused
    const existingInvite = await InviteCode.findOne({ email, isUsed: false });
    if (existingInvite) {
      return next(
        createError(400, "An invite code for this email already exists.")
      );
    }

    const code = uuidv4(); // Generates a unique invite code
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Code expires in 7 days

    const newInviteCode = new InviteCode({
      code,
      role,
      email,
      expiresAt,
    });

    await newInviteCode.save();
    res.status(201).json({ inviteCode: code, expiresAt });
  } catch (error) {
    next(error);
  }
};

// Verify invite code during registration
export const verifyInviteCode = async (req, res, next) => {
  try {
    const { code } = req.body;

    const inviteCode = await InviteCode.findOne({ code, isUsed: false });
    if (!inviteCode) {
      return next(createError(400, "Invalid or expired invite code."));
    }

    if (inviteCode.expiresAt < new Date()) {
      return next(createError(400, "Invite code has expired."));
    }

    // Mark the invite code as used
    inviteCode.isUsed = true;
    await inviteCode.save();

    res
      .status(200)
      .json({ message: "Invite code verified.", role: inviteCode.role });
  } catch (error) {
    next(error);
  }
};