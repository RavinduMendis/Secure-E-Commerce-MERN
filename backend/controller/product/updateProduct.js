const uploadProductPermission = require('../../helpers/permission');
const productModel = require('../../models/productModel');
const sanitizeQuery = require('../../helpers/sanitizer');

async function updateProductController(req, res) {
    try {
        // Check if the user has permission to upload products
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied");
        }

        // Extract the product ID and the rest of the fields from the request body
        const { _id, ...resBody } = req.body;
        console.log(req.body)

        // Sanitize each field in the request body
        const sanitizedFields = {};
        for (const key in resBody) {
            sanitizedFields[key] = sanitizeQuery(resBody[key]);
            console.log(sanitizedFields[key] )
        }

        // Update the product based on its ID with the sanitized fields
        const updatedProduct = await productModel.findByIdAndUpdate(_id, sanitizedFields, { new: true });
        console.log(updatedProduct)

        if (!updatedProduct) {
            throw new Error("Product not found");
        }

        // Return the updated product details
        res.json({
            message: "Product updated successfully",
            data: updatedProduct,
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

module.exports = updateProductController;
