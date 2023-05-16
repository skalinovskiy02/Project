import OrderApi from "../api/OrderApi";
import {IOrder} from "../models/IOrder";

class OrderService {
    async getOrdersByUserId(id: number){
        try {
            const response = await OrderApi.getOrdersByUser(id);
            return response.data as IOrder;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async getOrdersByOwnerId(id: number){
        try {
            const response = await OrderApi.getOrdersByOwner(id);
            return response.data as IOrder;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async postOrder(data: any) {
        try {
            const response = await OrderApi.postOrder(data);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }
}


export default new OrderService();