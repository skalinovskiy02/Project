import CommentApi from "../api/CommentApi";
import {IComment} from "../models/IComment";
import {AxiosResponse} from "axios";

class CommentService {
    async getCommentsByFlatID(id: number) {
        try {
            let response = await CommentApi.getCommentByFlatId(id);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async postComment(data: IComment) {
        try {
            const response = await CommentApi.postComment(data);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }
}

export default new CommentService();