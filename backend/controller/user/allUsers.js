const userModel = require("../../models/userModel");
const sanitizeQuery = require("../../helpers/sanitizer");

async function allUsers(req, res) {
    try {
        console.log("UserID for all users request:", sanitizeQuery(req.userId));

        // Fetch all users from the database
        const users = await userModel.find();

        // Respond with the fetched users
        res.json({
            message: "All Users",
            data: users,
            success: true,
            error: false
        });
    } catch (err) {
        // Handle errors and respond with appropriate status code and message
        res.status(400).json({
            message: err.message || "An error occurred while fetching users.",
            error: true,
            success: false
        });
    }
}

module.exports = allUsers;
