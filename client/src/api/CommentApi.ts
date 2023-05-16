import $api from "../http";
import {AxiosResponse} from "axios";
import {IComment} from "../models/IComment";

export default class CommentApi {
    static async getCommentByFlatId(id: number): Promise<AxiosResponse<IComment[]>> {
        return $api.get('/comment/get-comments:id', { params: { id } })
    }

    static async postComment(data: IComment): Promise<AxiosResponse<IComment>> {
        return $api.post('/comment/post-comment', data)
    }
}