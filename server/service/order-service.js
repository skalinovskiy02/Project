const OrderModel = require('../models/OrderModel')

class orderService {

    async postOrder(order) {
        let answer = await OrderModel.postOrder(order)
        return answer;
    }

    async getOrderByUserId(id){
        let orders = await OrderModel.getOrderByUserId(id)
        return orders;
    }

    async getOrderByOwnerId(id){
        let orders = await OrderModel.getOrderByOwnerId(id)
        return orders;
    }
}

module.exports = new orderService();