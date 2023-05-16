import FlatApi from "../api/FlatApi";
import {IFlat} from "../models/IFlat";

class FlatService {
    async getFlatsWithinBounds(bounds: []) {
        try {
            const response = await FlatApi.getPointsWithinBounds(bounds);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async getFlatById(id: number){
        try {
            const response = await FlatApi.getFlatById(id);
            return response.data as IFlat;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async getNearestFlats(point: [number, number], limit: number) {
        try {
            const response = await FlatApi.getNearestFlats(point, limit);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async postFlat(data: any) {
        try {
            const response = await FlatApi.postFlat(data);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }
}


export default new FlatService();