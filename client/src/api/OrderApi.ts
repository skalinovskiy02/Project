import $api from "../http";
import {AxiosResponse} from "axios";
import {IOrder} from "../models/IOrder";

export default class OrderApi {

    static async getOrdersByUser(id: number): Promise<AxiosResponse<IOrder>> {
        return $api.get('/order/get-order-by-user-id', { params: { id } })
    }
    static async getOrdersByOwner(id: number): Promise<AxiosResponse<IOrder>> {
        return $api.get('/order/get-order-by-owner-id', { params: { id } })
    }

    static async postOrder(data: any): Promise<AxiosResponse<IOrder[]>> {
        return $api.post('/order/post-order', data)
    }
}