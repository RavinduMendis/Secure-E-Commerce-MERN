const userModel = require("../../models/userModel");
const sanitizeQuery = require("../../helpers/sanitizer");

async function userDetailsController(req, res) {
    try {
        // Sanitize the userId from the request
        const sanitizedUserId = sanitizeQuery(req.userId);

        // Fetch the user details from the database
        const user = await userModel.findById(sanitizedUserId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Respond with the user details
        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details"
        });

        console.log("user", user);
    } catch (err) {
        // Handle any errors
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = userDetailsController;
