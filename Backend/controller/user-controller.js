import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config()


export const signupUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log("Request Body:", req.body);  // Check incoming data

    const user = {user_type: req.body.user_type, username: req.body.username, name: req.body.name, password: hashedPassword };
    // Validation - all fields required
    if (!user) {
      return res.status(400).json({ error: "Name, username, and password are required." });
    }

    // Create user document - match fields expected by your User model
    const newUser = new User(user);

    await newUser.save(); // Save to database

    return res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) =>{
  try {
    const user = await User.findOne({user_type: req.body.user_type, username: req.body.username });
    if(!user){
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if(!isValidPassword){
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '1h'});
    const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY,{ expiresIn: '7d' })
    const newToken = new Token({ token: refreshToken });
    console.log("Saving refreshToken:", refreshToken);
    await newToken.save();
    return res.status(200).json({ accessToken:accessToken, refreshToken:refreshToken, name: user.name, username: user.username, user_type: user.user_type });
  } catch (error) {
    return res.status(500).json({msg: 'Error while login in user'});
  }
}
