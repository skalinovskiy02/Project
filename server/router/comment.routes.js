const Router = require('express');
const commentRouter = Router();
const commentController = require('../controllers/commentController')

commentRouter.get('/comment/get-comments:id', commentController.getCommentsByFlatId);
commentRouter.post('/comment/post-comment', commentController.addCommentToFlat);

module.exports = commentRouter;