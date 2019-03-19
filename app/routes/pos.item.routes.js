module.exports = (app) => {
    const item = require('../controllers/pos.item.controller.js');

    // Create a new item
    app.post('/item', item.create);

    // Retrieve all items
    app.get('/item', item.findAll);

    // Retrieve a single item with itemId
    app.get('/item/:itemId', item.findOne);

    // Update a item with itemId
    app.put('/item/:itemId', item.update);

    // Delete a item with itemId
    app.delete('/item/:itemId', item.delete);

    // Delete all items
    app.delete('/item', item.deleteAll);
}
