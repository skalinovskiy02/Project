const Router = require('express');

const flatRouter = Router();
const flatController = require("../controllers/flat-Controller");
const authMiddleware = require("../middlewares/auth-middleware");

flatRouter.get('/flat/get-nearest-flats', flatController.getNearestFlats);
flatRouter.get('/flat/get-flat-by-id', flatController.getFlatById);
flatRouter.post('/flat/post-flat', authMiddleware, flatController.postFlat);

module.exports = flatRouter;