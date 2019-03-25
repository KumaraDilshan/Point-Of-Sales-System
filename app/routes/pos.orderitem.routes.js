module.exports = (app) => {
    const orderitem = require('../controllers/pos.orderitems.controller.js');

    // Create a new orderitem
    app.post('/orderitems', orderitem.create);

    // Retrieve all orderitems
    app.get('/orderitems', orderitem.findAll);

    // Retrieve a orderitem user with orderitemId
    app.get('/orderitems/:orderitemId', orderitem.findOne);

    // Update a orderitem with orderitemId
    app.put('/orderitems/:orderitemId', orderitem.update);

    // Delete a user with orderitem
    app.delete('/orderitems/:orderitemId', orderitem.delete);

    // Delete all orderitems
    app.delete('/orderitems', orderitem.deleteAll);
}
