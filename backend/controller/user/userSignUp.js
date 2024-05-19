const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const sanitizeQuery = require("../../helpers/sanitizer");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    // Basic validation
    if (!email || !password || !name) {
      throw new Error("Please provide email, password, and name.");
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Please provide a valid email address.");
    }

    // Password length validation
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }

    // Strong password policy
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
      );
    }

    const sanitizedName = sanitizeQuery(name);

    // Check if user already exists
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      throw new Error("User already exists.");
    }

    // Handle profile picture upload
    let profilePicPath = "";
    if (req.file) {
      profilePicPath = req.file.path;
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Prepare payload
    const payload = {
      email: email,
      password: hashPassword,
      name: sanitizedName,
      role: "GENERAL",
      profilePic: profilePicPath,
    };

    // Save user to database
    const userData = new userModel(payload);
    const saveUser = await userData.save();

    // Send success response
    res.status(201).json({
      data: saveUser,
      message: "User created successfully!",
      success: true,
      error: false,
    });
  } catch (err) {
    // Send error response
    res.status(400).json({
      message: err.message || "Failed to create user.",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
