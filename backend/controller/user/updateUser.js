const userModel = require("../../models/userModel");
const sanitizeQuery = require("../../helpers/sanitizer");

async function updateUser(req, res) {
    try {
        const sessionUser = sanitizeQuery(req.userId);
        const { userId, email, name, role } = req.body;

        // Sanitize inputs
        const sanitizedUserId = sanitizeQuery(userId);
        const sanitizedName = sanitizeQuery(name);
        const sanitizedRole = sanitizeQuery(role);

        const payload = {
            ...(email && { email: email }),
            ...(sanitizedName && { name: sanitizedName }),
            ...(sanitizedRole && { role: sanitizedRole }),
        };

        // Check if the user making the request exists
        const user = await userModel.findById(sessionUser);

        if (!user) {
            return res.status(404).json({
                message: "Session user not found",
                error: true,
                success: false
            });
        }

        // Check if the user has the right to update the other user's details
        if (user.role !== 'admin' && sessionUser !== sanitizedUserId) {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false
            });
        }

        // Update the user
        const updateUser = await userModel.findByIdAndUpdate(sanitizedUserId, payload, { new: true });

        if (!updateUser) {
            return res.status(404).json({
                message: "User to update not found",
                error: true,
                success: false
            });
        }

        res.json({
            data: updateUser,
            message: "User Updated",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;
