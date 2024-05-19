const sanitizeQuery = require("../../helpers/sanitizer");
const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    // Get the search query from the request and sanitize it
    let query = req.query.q || "";
    query = sanitizeQuery(query);
    console.log(query);

    // Perform the search using a regular expression
    const regex = new RegExp(query, "i", "g");
    const product = await productModel.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    // Return the search results
    res.json({
      data: product,
      message: "Search Product list",
      error: false,
      success: true,
    });
  } catch (err) {
    // Handle errors
    res.json({
      message: err.message || "internal server error",
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;
