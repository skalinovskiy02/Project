const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const UserModel = require('../models/UserModel')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dtos')
const ApiError = require("../exeptions/api-error");

class UserService {

    async registration(email, password) {
        const candidate = await UserModel.findByEmail(email);
        if (candidate.rows[0]) {
            throw ApiError.BadRequest('Пользователь с таким email уже существует.')
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4();

        const user = await UserModel.create(email, hashPassword, activationLink);
        await mailService.sendActivationMail(email, activationLink);
        const userDto = new UserDto(user.rows[0]);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink){
        const user = await UserModel.findByLink(activationLink);
        if(!user.rows[0]){
            throw ApiError.BadRequest('Некорректная ссылка активации');
        }
        user.rows[0].isActivated = true;
        await UserModel.save(user.rows[0]);
    }

}

module.exports = new UserService();
