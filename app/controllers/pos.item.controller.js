const Item = require('../models/item.model');

// Create and Save a new item
exports.create = (req, res) => {
    // Validate request
    if(!req.body.item_id) {
        return res.status(400).send({
            message: "Item ID can not be empty"
        });
    }if(!req.body.item_name) {
        return res.status(400).send({
            message: "Item name can not be empty"
        });
    }if(!req.body.item_price) {
        return res.status(400).send({
            message: "Item price can not be empty"
        });
    }

    // Create a item
    const item = new Item({
        item_id: req.body.item_id,
        item_name: req.body.item_name,
        item_price: req.body.item_price
    });

    // Save item in the database
    item.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the item."
        });
    });
};

// Retrieve and return all items from the database.
exports.findAll = (req, res) => {
    Item.find()
        .then(items => {
            res.send(items);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving items."
        });
    });
};

// Find a single item with a itemId
exports.findOne = (req, res) => {
    Item.findById(req.params.itemId)
        .then(item => {
            if(!item) {
                return res.status(404).send({
                    message: "item not found with id " + req.params.itemId
                });
            }
            res.send(item);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        return res.status(500).send({
            message: "Error retrieving item with id " + req.params.itemId
        });
    });
};

// Update a item identified by the itemId in the request
exports.update = (req, res) => {
    // Validate request
    if(!req.body.item_id) {
        return res.status(400).send({
            message: "Item ID can not be empty"
        });
    }if(!req.body.item_name) {
        return res.status(400).send({
            message: "Item name can not be empty"
        });
    }if(!req.body.item_price) {
        return res.status(400).send({
            message: "Item price can not be empty"
        });
    }

    // Find item and update it with the request body
    Item.findByIdAndUpdate(req.params.itemId, {
        item_id: req.body.item_id,
        item_name: req.body.item_name,
        item_price: req.body.item_price
    }, {new: true})
        .then(item => {
            if(!item) {
                return res.status(404).send({
                    message: "item not found with id " + req.params.itemId
                });
            }
            res.send(item);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });
        }
        return res.status(500).send({
            message: "Error updating item with id " + req.params.itemId
        });
    });
};

// Delete a item with the specified itemId in the request
exports.delete = (req, res) => {
    Item.findByIdAndRemove(req.params.itemId)
        .then(item => {
            if(!item) {
                return res.status(404).send({
                    message: "item not found with id " + req.params.itemId
                });
            }
            res.send({message: "item deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });
        }
        return res.status(500).send({
            message: "Could not delete item with id " + req.params.itemId
        });
    });
};

// Delete all items
exports.deleteAll = (req, res) => {
    Item.remove()
        .then(items => {
            res.send(items);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting items."
        });
    });
};
