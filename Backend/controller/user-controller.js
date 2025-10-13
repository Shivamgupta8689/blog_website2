import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async (req, res) => {
  try {
    const { user_type, username, name, password } = req.body;

    // ✅ Validate required fields
    if (!user_type || !username || !name || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // ✅ Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists." });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create and save user
    const newUser = new User({
      user_type,
      username,
      name,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { user_type, username, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ user_type, username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // ✅ Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // ✅ Create tokens safely (don’t include entire user document)
    const payload = {
      id: user._id,
      username: user.username,
      user_type: user.user_type
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });

    // ✅ Store refresh token
    const newToken = new Token({ token: refreshToken });
    await newToken.save();

    return res.status(200).json({
      accessToken,
      refreshToken,
      name: user.name,
      username: user.username,
      user_type: user.user_type
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ msg: 'Error while logging in user', details: error.message });
  }
};
