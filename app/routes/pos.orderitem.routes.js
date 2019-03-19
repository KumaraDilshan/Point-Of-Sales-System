module.exports = (app) => {
    const orderitem = require('../controllers/pos.orderitems.controller.js');

    // Create a new orderitem
    app.post('/orderitem', orderitem.create);

    // Retrieve all orderitems
    app.get('/orderitem', orderitem.findAll);

    // Retrieve a orderitem user with orderitemId
    app.get('/orderitem/:orderitemId', orderitem.findOne);

    // Update a orderitem with orderitemId
    app.put('/orderitem/:orderitemId', orderitem.update);

    // Delete a user with orderitem
    app.delete('/orderitem/:orderitemId', orderitem.delete);

    // Delete all orderitems
    app.delete('/orderitem', orderitem.deleteAll);
}
