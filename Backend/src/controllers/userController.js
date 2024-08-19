// controllers/userController.js
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import BlackListedTokens from "../models/blacklistedTokesModel.js";
import { CustomStatusCodes } from "../Utilities/CustomStatusCodes.js";
import { newAccessToken, signUser } from "../Helpers/jwt.auth.helper.js";

// Register a new user
export const registerUser = async (req, res) => {
  const { username, password, email, name } = req.body;
  try {
    // Create a new user with all provided fields
    const newUser = new User({
      username,
      password,
      email,
      name,
      recipeSuggestionChat: [],  
      mealPlanningChat:  []             
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Log in a user
export const loginUser = async (req, res) => {
  const {username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { accessToken, refreshToken } = signUser(username)
    res.status(CustomStatusCodes.SUCCESS).send({
      accessToken: accessToken,
      refreshToken: refreshToken,
      username: user.username,
      code: CustomStatusCodes.SUCCESS
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refresh = async (req, res) => {
  const { username } = req
  const {accessToken} = newAccessToken(username)

  res.status(CustomStatusCodes.SUCCESS).send({
      accessToken: accessToken,
      code: CustomStatusCodes.SUCCESS
  })
}

// Log out a user
export const logoutUser = async (req, res) => {
  try {
    const token = req.token;

    // Add the token to the blacklist
    const blacklisted = new BlackListedTokens({ token });
    await blacklisted.save();

    res.status(CustomStatusCodes.SUCCESS).send({
      token: blacklisted.token,
      message: "TOKEN_DELETED",
      code: CustomStatusCodes.SUCCESS
    });
  } catch (error) {
    console.error('Error blacklisting token:', error);
    res.status(500).send({
      message: 'Internal Server Error',
      code: CustomStatusCodes.INTERNAL_SERVER_ERROR
    });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  const username=req.username
  try {
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateChat = async (req, res) => {
  try {
    const { username } = req;
    const { type, chat } = req.body;

    // Validate the chat type
    if (!['recipeSuggestionChat', 'mealPlanningChat'].includes(type)) {
      return res.status(400).send({
        message: 'Invalid chat type',
      });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    // Update the appropriate chat array
    user[type].push(chat);

    // Save the user document
    await user.save();

    res.status(200).send({
      message: 'Chat updated successfully',
      user, // Optionally include the updated user object
    });
  } catch (error) {
    console.error('Error updating chat:', error);
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

export const fetchAllChats = async (req, res) => {
  try {
    const { username } = req;
    const { type } = req.body;

    // Validate the chat type
    if (!['recipeSuggestionChat', 'mealPlanningChat'].includes(type)) {
      return res.status(400).send({
        message: 'Invalid chat type',
      });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    // Retrieve all chats of the specified type
    const chats = user[type];

    res.status(200).send({
      message: 'Chats fetched successfully',
      chats, // Include all chats of the specified type
    });
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

