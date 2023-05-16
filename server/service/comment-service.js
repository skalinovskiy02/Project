const CommentModel = require('../models/CommentModel')

class CommentService {

    async getCommentsByFlatId(id){
        let comments = await CommentModel.getCommentsByFlat(id)
        return comments;
    }

    async addCommentToFlatId(comment){
        await CommentModel.addCommentToFlat(comment)
        return comment;
    }
}

module.exports = new CommentService();