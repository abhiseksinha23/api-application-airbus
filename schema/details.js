const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
    topic: String,
    // image: String,
    description: String
});

module.exports = {
    detailsSchema: detailsSchema
}