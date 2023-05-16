const Router = require('express').Router;
const router = new Router();
const userRouter = require("./user.routes");
const flatRouter = require("./flat.routes");
const commentRouter = require("./comment.routes");
const orderRouter = require("./order.routes");

router.use(userRouter)
router.use(flatRouter)
router.use(commentRouter)
router.use(orderRouter)
module.exports = router;
