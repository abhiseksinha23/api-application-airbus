const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    // image: String,
    description: { type: String, required: true }
});

module.exports = {
    detailsSchema: detailsSchema
}