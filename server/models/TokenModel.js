const db = require('../db')

class TokenModel {
    async findOneByUserID(userId) {
        const answer = await db.query(
            `SELECT * FROM token_model WHERE userid = $1`,
            [userId])
        return answer.rows[0] ? answer.rows[0] : undefined;
    };
    async findOneByRefreshToken(refreshToken) {
        const answer = await db.query(
            `SELECT * FROM token_model WHERE refreshtoken = $1`,
            [refreshToken])
        return answer.rows[0] ? answer.rows[0] : undefined;
    }



    async create(userId, refreshToken) {
        const answer = await db.query(
            'INSERT INTO token_model(userid, refreshToken) VALUES ($1, $2) RETURNING *',
            [userId, refreshToken]);
        return answer.rows[0] ? answer.rows[0] : undefined;

    }

    async save(tokenData) {
        const answer = await db.query(
            'UPDATE token_model  SET refreshToken = $1 WHERE userid = $2 RETURNING *',
            [tokenData.refreshToken, tokenData.userid]);
        return answer.rows[0] ? answer.rows[0] : undefined;
    }

    async deleteRefreshToken(refreshToken){
        const answer = await db.query({
            text: 'DELETE FROM token_model WHERE refreshtoken = $1',
            values: [refreshToken]
        });
        console.log('logout', answer);
        return 0;
    }
}

module.exports = new TokenModel();