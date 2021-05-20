const mongoose = require('mongoose');

const improvementSchema = new mongoose.Schema({
    topic: String,
    detail: String
});

module.exports = {
    improvementSchema: improvementSchema
}