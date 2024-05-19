const addToCartModel = require("../../models/cartProduct");
const sanitizeQuery = require("../../helpers/sanitizer");

const countAddToCartProduct = async (req, res) => {
    try {
        // Sanitize the userId from the request
        const sanitizedUserId = sanitizeQuery(req.userId);

        // Count the number of documents in the cart collection for the sanitized userId
        const count = await addToCartModel.countDocuments({ userId: sanitizedUserId });

        // Respond with the count of products in the user's cart
        res.json({
            data: {
                count: count
            },
            message: "ok",
            error: false,
            success: true
        });
    } catch (error) {
        // Handle errors and respond with appropriate message and status
        res.status(400).json({
            message: error.message || "An error occurred while counting cart products.",
            error: true,
            success: false
        });
    }
};

module.exports = countAddToCartProduct;
