const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Please provide a valid email address");
        }

        // Check if email and password are provided
        if (!email) {
            throw new Error("Please provide an email");
        }
        if (!password) {
            throw new Error("Please provide a password");
        }

        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Compare password hash
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Invalid email or password");
        }

        // Generate JWT token
        const tokenData = {
            _id: user._id,
            email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

        // Set HTTPOnly cookie with the JWT token
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 8, // 8 hours
            sameSite: 'Strict' // Protects against CSRF
        }).status(200).json({
            message: "Login successful",
            data: token,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred during sign-in",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
