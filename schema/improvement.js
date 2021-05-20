const mongoose = require('mongoose');

const improvementSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    detail: { type: String, required: true }
});

module.exports = {
    improvementSchema: improvementSchema
}