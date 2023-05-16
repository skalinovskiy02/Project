const OrderService = require('../service/order-service');
const AuthError = require("../exeptions/api-error");

class orderController {
    async postOrder(req, res, next) {
        try {
            let order = req.body;
            const orderId = await OrderService.postOrder(order)
            res.status(200).send(orderId);
        } catch (e) {
            next(e);
        }
    }

    async getOrderByUserId(req, res, next) {
        try {
            const {id} = req.query;
            let order = await OrderService.getOrderByUserId(id);
            res.status(200).send(order);
        } catch (e) {
            next(e);
        }
    }

    async getOrderByOwnerId(req, res, next) {
        try {
            const {id} = req.query;
            let order = await OrderService.getOrderByOwnerId(id);
            res.status(200).send(order);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new orderController();