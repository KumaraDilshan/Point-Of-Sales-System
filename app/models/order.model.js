const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        ref: "User",
        required: true
    },
    order_name: {
        type: String,
        required: true
    },
    order_state: {
        type: String,
        lowercase: true,
        required: true
    },
    order_description: {
        type: String
    },
    /*order_time:{
        timestamp: true
    }*/
    }, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);