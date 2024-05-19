const addToCartModel = require("../../models/cartProduct");
const sanitizeQuery = require("../../helpers/sanitizer");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = sanitizeQuery(req.body._id);

        // Ensure that the product being deleted belongs to the current user
        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId, userId: currentUserId });

        if (deleteProduct.deletedCount === 0) {
            return res.status(404).json({
                message: "Product not found in cart or does not belong to the current user",
                error: true,
                success: false,
            });
        }

        res.json({
            message: "Product Deleted From Cart",
            error: false,
            success: true,
            data: deleteProduct
        });

    } catch (err) {
        res.status(400).json({
            message: err?.message || "An error occurred while deleting the product from the cart",
            error: true,
            success: false
        });
    }
};

module.exports = deleteAddToCartProduct;
