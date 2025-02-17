import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();
    export const register = async (req, res) => {
    try {
        const { username, password, email, fullName } = req.body;
        let user = await User.findOne({ email });
        if (user) {
        return res.json({ message: "username is not found" });
        }
        user = new User({ username, password, email, fullName });
        await user.save();
        return res.json({ message: "Register successful" });
    } catch (err) {
        return res.json({ error: err.message, message: "server error" });
    }
    };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not found" });
    }
    // const isMatch = await user.comparePassword(password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: "Enter Correct Password" });
    // }
    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    return res.json({ error: err.message, message: "server error" });
  }
};
