const Router = require('express');
const userRouter = Router();
const userController = require('../controllers/user-controller')
const {body} = require("express-validator");

userRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration);
userRouter.get('/activate/:link', userController.activate);
userRouter.get('/refresh', userController.refresh);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);

module.exports = userRouter;