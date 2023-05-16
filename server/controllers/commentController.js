const CommentService = require("../service/comment-service");

class commentController{

    async getCommentsByFlatId(req, res, next){
        try{
            const {id} = req.query;
            let comments = await CommentService.getCommentsByFlatId(id);
            res.status(200).send(comments);
        }catch (e){
            next(e);
        }
    }

    async addCommentToFlat(req, res, next){
        try{
            const comment = req.body;
            await CommentService.addCommentToFlatId(comment);
            res.status(200).send(comment);
        }catch (e){
            next(e);
        }
    }

}

module.exports = new commentController();