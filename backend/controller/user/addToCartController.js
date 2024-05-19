const addToCartModel = require("../../models/cartProduct");
const sanitizeQuery = require("../../helpers/sanitizer");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId;

        console.log("product ID: ",productId)
        // Sanitize the productId
        const sanitizedProductId = sanitizeQuery(productId);
        console.log(" SANITIZE product ID: ",sanitizedProductId)
        // Check if the product is already in the cart
        const isProductAvailable = await addToCartModel.findOne({ productId: sanitizedProductId });

        console.log("isProductAvailable", isProductAvailable);

        if (isProductAvailable) {
            return res.json({
                message: "Already exists in Add to cart",
                success: false,
                error: true
            });
        }

        // Prepare the payload for the new cart item
        const payload = {
            productId: sanitizedProductId,
            quantity: 1,
            userId: currentUser,
        };

        // Create a new cart item and save it
        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        // Return the saved cart item
        return res.json({
            data: saveProduct,
            message: "Product Added to Cart",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
