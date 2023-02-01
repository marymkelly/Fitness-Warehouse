

const CartController = require('../controllers/cart.controller')

module.exports = (app) => {
    console.log('something')
    app.get('/cart', CartController.testApi)
    // app.post("/api/carts", CartController.addcart)
}