const Orderitems = require('../models/order_items.model');

// Create and Save a new orderitems
exports.create = (req, res) => {
    // Validate request
    if(!req.body.order_id) {
        return res.status(400).send({
            message: "orderID can not be empty"
        });
    }if(!req.body.item_id) {
        return res.status(400).send({
            message: "itemID can not be empty"
        });
    }if(!req.body.item_quantity) {
        return res.status(400).send({
            message: "item quantity can not be empty"
        });
    }

    // Create a orderitem
    const orderitems = new Orderitems({
        order_id: req.body.order_id,
        item_id: req.body.item_id,
        item_quantity: req.body.item_quantity
    });

    // Save orderitems in the database
    orderitems.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the orderitems."
        });
    });
};

// Retrieve and return all orderitemss from the database.
exports.findAll = (req, res) => {
    Orderitems.find()
        .then(orderitems => {
            res.send(orderitems);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orderitemss."
        });
    });
};

// Find a single orderitems with a orderitemsId
exports.findOne = (req, res) => {
    Orderitems.findById(req.params.orderitemId)
        .then(orderitems => {
            if(!orderitems) {
                return res.status(404).send({
                    message: "orderitems not found with id " + req.params.orderitemId
                });
            }
            res.send(orderitems);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "orderitems not found with id " + req.params.orderitemId
            });
        }
        return res.status(500).send({
            message: "Error retrieving orderitems with id " + req.params.orderitemId
        });
    });
};

// Update a orderitems identified by the orderitemsId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.order_id) {
        return res.status(400).send({
            message: "orderID can not be empty"
        });
    }if(!req.body.item_id) {
        return res.status(400).send({
            message: "itemID can not be empty"
        });
    }if(!req.body.item_quantity) {
        return res.status(400).send({
            message: "item quantity can not be empty"
        });
    }

    // Find orderitems and update it with the request body
    Orderitems.findByIdAndUpdate(req.params.orderitemId, {
        order_id: req.body.order_id,
        item_id: req.body.item_id,
        item_quantity: req.body.item_quantity
    }, {new: true})
        .then(orderitems => {
            if(!orderitems) {
                return res.status(404).send({
                    message: "orderitems not found with id " + req.params.orderitemId
                });
            }
            res.send(orderitems);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "orderitems not found with id " + req.params.orderitemId
            });
        }
        return res.status(500).send({
            message: "Error updating orderitems with id " + req.params.orderitemId
        });
    });
};

// Delete a orderitems with the specified orderitemsId in the request
exports.delete = (req, res) => {
    Orderitems.findByIdAndRemove(req.params.orderitemId)
        .then(orderitems => {
            if(!orderitems) {
                return res.status(404).send({
                    message: "orderitems not found with id " + req.params.orderitemId
                });
            }
            res.send({message: "orderitems deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "orderitems not found with id " + req.params.orderitemId
            });
        }
        return res.status(500).send({
            message: "Could not delete orderitems with id " + req.params.orderitemId
        });
    });
};

// Delete all controllers
exports.deleteAll = (req, res) => {
    Orderitems.remove()
        .then(items => {
            res.send(items);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting items."
        });
    });
};