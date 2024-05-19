const productModel = require("../../models/productModel");
const sanitizeQuery = require("../../helpers/sanitizer");

const getCategoryProduct = async (req, res) => {
    try {
        // Retrieve distinct categories from the database
        const productCategory = await productModel.distinct("category");

        console.log("category", productCategory);

        // Array to store one product from each category
        const productByCategory = [];

        for (const category of productCategory) {
            // Sanitize the category name
            const sanitizedCategory = sanitizeQuery(category);

            // Find one product for the sanitized category
            const product = await productModel.findOne({ category: sanitizedCategory });

            if (product) {
                productByCategory.push(product);
            }
        }

        res.json({
            message: "category product",
            data: productByCategory,
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

module.exports = getCategoryProduct;
