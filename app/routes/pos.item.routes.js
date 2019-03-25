module.exports = (app) => {
    const item = require('../controllers/pos.item.controller.js');

    // Create a new item
    app.post('/items', item.create);

    // Retrieve all items
    app.get('/items', item.findAll);

    // Retrieve a single item with itemId
    app.get('/items/:itemId', item.findOne);

    // Update a item with itemId
    app.put('/items/:itemId', item.update);

    // Delete a item with itemId
    app.delete('/items/:itemId', item.delete);

    // Delete all items
    app.delete('/items', item.deleteAll);
}
