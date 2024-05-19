const addToCartModel = require("../../models/cartProduct");

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId;

        // Find all cart items for the current user and populate product details
        const allProducts = await addToCartModel.find({ userId: currentUser }).populate("productId");

        res.json({
            data: allProducts,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = addToCartViewProduct;
