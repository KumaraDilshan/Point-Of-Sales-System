module.exports = (app) => {
    const user = require('../controllers/pos.user.controller.js');

    //user routes
    // Create a new user
    app.post('/users', user.create);

    // Retrieve all users
    app.get('/users', user.findAll);

    // Retrieve a single user with userId
    app.get('/users/:userId', user.findOne);

    // Update a user with userId
    app.put('/users/:userId', user.update);

    // Delete a user with userId
    app.delete('/users/:userId', user.delete);

    // Delete all items
    app.delete('/users', user.deleteAll);
}
