import User from "../models/User.js"
import jwt from "jsonwebtoken"

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, fullName } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] })

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      })
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      phoneNumber,
      fullName,
    })

    if (user) {
      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
        },
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid user data",
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email }).select("+password")

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      // Update last login
      user.lastLogin = Date.now()
      await user.save()

      res.json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
        },
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
        },
      })
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
