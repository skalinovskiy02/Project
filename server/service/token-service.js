const jwt = require('jsonwebtoken')
const TokenModel = require('../models/TokenModel')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '10m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne(userId);
        if (tokenData.rows[0]) {
            tokenData.rows[0].refreshToken = refreshToken;
            const savedToken = TokenModel.save(tokenData.rows[0]);
            return savedToken.rows[0];
        }
        const token = await TokenModel.create(userId, refreshToken);
        return token.rows[0];
    }

};

module.exports = new TokenService();