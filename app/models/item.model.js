const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item_id: {
        type: Number,
        required: true
    },
    item_name: {
        type: String,
        lowercase: true,
        required: true
    },
    item_price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Item', itemSchema);