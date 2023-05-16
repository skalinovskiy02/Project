const db = require('../db')

class OrderModel{
    async postOrder(order){
        const answer = await db.query(
            {
                text:'INSERT INTO order_model(userid, owner, flatid, dayin, dayout, cost)' +
                    'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                values: [order.userid, order.owner, order.flatId, order.dayIn, order.dayOut, order.cost]
            })
        return answer.rows[0] ? answer.rows[0] : undefined;
    }

    async getOrderByUserId(id){
        const answer = await db.query(
            {
                text:'SELECT * FROM order_model WHERE userid = $1',
                values: [id]
            })
        return answer.rows[0] ? answer.rows[0] : undefined;
    }
    async getOrderByOwnerId(id){
        const answer = await db.query(
            {
                text:'SELECT * FROM order_model WHERE owner = $1',
                values: [id]
            })
        return answer.rows[0] ? answer.rows[0] : undefined;
    }
}

module.exports = new OrderModel();