const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const UserModel = require('../models/UserModel')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dtos')
const ApiError = require("../exeptions/api-error");

async function updateUserTokens(user) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
}

class UserService {

    async registration(email, password) {
        const candidate = await UserModel.findByEmail(email);
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с таким email уже существует.')
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4();

        const user = await UserModel.create(email, hashPassword, activationLink);
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        return await updateUserTokens(user)
    }

    async activate(activationLink) {
        const user = await UserModel.findByLink(activationLink);
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации');
        }
        user.isActivated = true;
        return await UserModel.save(user);
    }

    async login(email, password) {
        const user = await UserModel.findByEmail(email);
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        return await updateUserTokens(user)

    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        return await updateUserTokens(user)
    }

}

module.exports = new UserService();
