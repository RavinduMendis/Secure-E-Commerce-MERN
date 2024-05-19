const sanitizeQuery = (query) => {
    // Check if query is a string
    if (typeof query !== 'string') {
        return query; // Return input as is if not a string
    }
    // Replace any potentially harmful characters with an empty string
    return query.replace(/[^\w\s]/gi, '');
};

module.exports = sanitizeQuery;
