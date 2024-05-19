const productModel = require("../../models/productModel");
const sanitizeQuery = require("../../helpers/sanitizer");

const getProductDetails = async (req, res) => {
    try {
        // Extract productId from the request body
        const { productId } = req.body;

        // Sanitize productId to prevent injection attacks
        const sanitizedProductId = sanitizeQuery(productId);

        // Find product details by productId
        const product = await productModel.findById(sanitizedProductId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        // Return product details
        res.json({
            data: product,
            message: "OK",
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
};

module.exports = getProductDetails;
