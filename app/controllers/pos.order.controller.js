const Order = require('../models/order.model');

// Create and Save a new order
exports.create = (req, res) => {
    // Validate request
    if(!req.body.order_id) {
        return res.status(400).send({
            message: "order ID can not be empty"
        });
    }if(!req.body.user_id) {
        return res.status(400).send({
            message: "user ID can not be empty"
        });
    }if(!req.body.order_name) {
        return res.status(400).send({
            message: "order name can not be empty"
        });
    }if(!req.body.order_state) {
        return res.status(400).send({
            message: "order state can not be empty"
        });
    }

    // Create a order
    const order = new Order({
        order_id: req.body.order_id,
        user_id: req.body.user_id,
        order_name: req.body.order_name,
        order_state: req.body.order_state,
        order_description: req.body.order_description || "No description",
    });

    // Save order in the database
    order.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the order."
        });
    });
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Order.find()
        .then(orders => {
            res.send(orders);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

// Find a single order with a orderId
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId)
        .then(order => {
            if(!order) {
                return res.status(404).send({
                    message: "order not found with id " + req.params.orderId
                });
            }
            res.send(order);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error retrieving order with id " + req.params.orderId
        });
    });
};

// Update a order identified by the orderId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.order_id) {
        return res.status(400).send({
            message: "order ID can not be empty"
        });
    }if(!req.body.user_id) {
        return res.status(400).send({
            message: "user ID can not be empty"
        });
    }if(!req.body.order_name) {
        return res.status(400).send({
            message: "order name can not be empty"
        });
    }if(!req.body.order_state) {
        return res.status(400).send({
            message: "order state can not be empty"
        });
    }

    // Find order and update it with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
        order_id: req.body.order_id,
        user_id: req.body.user_id,
        order_name: req.body.order_name,
        order_state: req.body.order_state,
        order_description: req.body.order_description || "No description"
    }, {new: true})
        .then(order => {
            if(!order) {
                return res.status(404).send({
                    message: "order not found with id " + req.params.orderId
                });
            }
            res.send(order);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error updating order with id " + req.params.orderId
        });
    });
};

// Delete a order with the specified orderId in the request
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
        .then(order => {
            if(!order) {
                return res.status(404).send({
                    message: "order not found with id " + req.params.orderId
                });
            }
            res.send({message: "order deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Could not delete order with id " + req.params.orderId
        });
    });
};

// Delete all orders
exports.deleteAll = (req, res) => {
    Order.remove()
        .then(items => {
            res.send(items);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting items."
        });
    });
};