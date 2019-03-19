const mongoose = require('mongoose');

const order_itemsSchema = new mongoose.Schema({
    order_id: {
        type: String,
        ref: 'Order',
        required: true
    },
    item_id: {
        type: String,
        ref: 'Item',
        required: true
    },
    item_quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('OrderItems', order_itemsSchema);