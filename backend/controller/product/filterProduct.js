const productModel = require("../../models/productModel");
const sanitizeQuery = require("../../helpers/sanitizer");

const filterProductController = async (req, res) => {
    try {

        const categoryList = req?.body?.category || [];

        const categorySanitizedList = categoryList.map(category => sanitizeQuery(category));

        const products = await productModel.find({
            category: {
                "$in": categorySanitizedList
            }
        });

        res.json({
            data: products,
            message: "Filtered products",
            error: false,
            success: true
        });
    } catch (err) {
        // Handle errors
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = filterProductController;
