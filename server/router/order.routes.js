const Router = require('express');

const orderRouter = Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/auth-middleware");

orderRouter.get('/order/get-order-by-user-id', authMiddleware, orderController.getOrderByUserId);
orderRouter.get('/order/get-order-by-owner-id', authMiddleware, orderController.getOrderByOwnerId);
orderRouter.post('/order/post-order', authMiddleware, orderController.postOrder);

module.exports = orderRouter;