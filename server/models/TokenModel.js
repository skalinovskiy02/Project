const db = require('../db')

class TokenModel {
    async findOne(userId) {
        return await db.query(
            `SELECT * FROM token_model WHERE userid = $1`,
            [userId])
    }

    async create(userId, refreshToken) {
        return await db.query(
            'INSERT INTO token_model(userid, refreshToken) VALUES ($1, $2) RETURNING *',
            [userId, refreshToken]);

    }

    async save(tokenData) {
        return await db.query(
            'UPDATE token_model  SET refreshToken = $1 WHERE userid = $2 RETURNING *',
            [tokenData.refreshToken, tokenData.userid]);
    }
}

module.exports = new TokenModel();