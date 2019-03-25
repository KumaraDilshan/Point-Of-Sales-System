module.exports = (app) => {
    const order = require('../controllers/pos.order.controller.js');

    // Create a new order
    app.post('/orders', order.create);

    // Retrieve all orders
    app.get('/orders', order.findAll);

    // Retrieve a single order with orderId
    app.get('/orders/:orderId', order.findOne);

    // Update a order with orderId
    app.put('/orders/:orderId', order.update);

    // Delete a order with orderId
    app.delete('/orders/:orderId', order.delete);

    // Delete all orders
    app.delete('/orders', order.deleteAll);
}
