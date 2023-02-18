const db = require('../db')
const findOneQuery = {}

class UserModel {
    async findByEmail(email) {
        return await db.query(
            {
                text: `SELECT * FROM user_model WHERE email = $1`,
                values: [email]
            })
    }

    async findByLink(activationLink) {
        return await db.query(
            {
                text: `SELECT * FROM user_model WHERE activationlink = $1`,
                values: [activationLink]
            })
    }

    async create(email, password, activationLink) {
        return await db.query(
            'INSERT INTO user_model(email, password, activationLink) VALUES ($1, $2, $3) RETURNING * ',
            [email, password, activationLink]);
    }

    async save(user) {
        return await db.query(
            'UPDATE user_model SET isactivated = $1 WHERE id = $2 RETURNING *',
            [user.isActivated, user.id]);
    }
}

module.exports = new UserModel();