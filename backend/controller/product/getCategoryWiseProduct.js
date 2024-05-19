const productModel = require("../../models/productModel");
const sanitizeQuery = require("../../helpers/sanitizer");

const getCategoryWiseProduct = async (req, res) => {
    try {
        // Retrieve the category from either request body or query parameters
        const { category } = req?.body || req?.query;

        // Sanitize the category name
        const sanitizedCategory = sanitizeQuery(category);

        // Find products based on the sanitized category
        const products = await productModel.find({ category: sanitizedCategory });

        res.json({
            data: products,
            message: "Product",
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

module.exports = getCategoryWiseProduct;
