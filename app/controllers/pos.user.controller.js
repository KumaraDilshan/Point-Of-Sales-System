const User = require('../models/user.model');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.user_id) {
        return res.status(400).send({
            message: "user ID can not be empty"
        });
    }if(!req.body.user_name) {
        return res.status(400).send({
            message: "user name can not be empty"
        });
    }if(!req.body.user_password) {
        return res.status(400).send({
            message: "user password can not be empty"
        });
    }

    // Create a user
    const user = new User({
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        user_password: req.body.user_password
    });

    // Save user in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.user_id) {
        return res.status(400).send({
            message: "user ID can not be empty"
        });
    }if(!req.body.user_name) {
        return res.status(400).send({
            message: "user name can not be empty"
        });
    }if(!req.body.user_password) {
        return res.status(400).send({
            message: "user password can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        user_password: req.body.user_password
    }, {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send({message: "user deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};

// Delete all users
exports.deleteAll = (req, res) => {
    User.remove()
        .then(items => {
            res.send(items);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting items."
        });
    });
};