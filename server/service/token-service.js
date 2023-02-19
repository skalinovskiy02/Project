const jwt = require('jsonwebtoken')
const TokenModel = require('../models/TokenModel')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try{
            const userData = jwt.verify( token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }catch (e){
            return null;
        }

    }
    validateRefreshToken(token){
        try{
            const userData = jwt.verify( token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }catch (e){
            return null;
        }

    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOneByUserID(userId);
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            const savedToken = TokenModel.save(tokenData);
            return savedToken;
        }
        const token = await TokenModel.create(userId, refreshToken);
        return token;
    }

    async removeToken(refreshToken){
        const tokenData = await TokenModel.deleteRefreshToken(refreshToken);
        return tokenData;
    }
    async findToken(refreshToken){
        const tokenData = await TokenModel.findOneByRefreshToken(refreshToken);
        return tokenData;
    }

};

module.exports = new TokenService();