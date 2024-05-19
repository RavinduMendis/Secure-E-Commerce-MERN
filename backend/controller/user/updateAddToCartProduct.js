const addToCartModel = require("../../models/cartProduct");
const sanitizeQuery = require("../../helpers/sanitizer");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = sanitizeQuery(req?.body?._id);
        const qty = sanitizeQuery(req.body.quantity);

        // Ensure the product ID and quantity are provided
        if (!addToCartProductId || !qty) {
            return res.status(400).json({
                message: "Product ID and quantity are required",
                error: true,
                success: false
            });
        }

        // Update the product quantity in the cart
        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId, userId: currentUserId },
            { $set: { quantity: qty } }
        );

        // Check if the product was updated
        if (updateProduct.matchedCount === 0) {
            return res.status(404).json({
                message: "Product not found in cart or does not belong to the current user",
                error: true,
                success: false,
            });
        }

        res.json({
            message: "Product Updated",
            data: updateProduct,
            error: false,
            success: true
        });

    } catch (err) {
        res.status(400).json({
            message: err?.message || "An error occurred while updating the product in the cart",
            error: true,
            success: false
        });
    }
};

module.exports = updateAddToCartProduct;
