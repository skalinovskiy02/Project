const db = require('../db')

class UserModel {
    async findByEmail(email) {
        const answer = await db.query(
            {
                text: `SELECT * FROM user_model WHERE email = $1`,
                values: [email]
            })
        return answer.rows[0] ? answer.rows[0] : undefined;
    }

    async findById(id) {
        const answer = await db.query(
            {
                text: `SELECT * FROM user_model WHERE id = $1`,
                values: [id]
            })
        return answer.rows[0] ? answer.rows[0] : undefined;
    }

    async findByLink(activationLink) {
        const answer = await db.query(
            {
                text: `SELECT * FROM user_model WHERE activationlink = $1`,
                values: [activationLink]
            })
        return answer.rows[0] ? answer.rows[0] : undefined;
    }

    async create(email, password, activationLink) {
        const answer = await db.query(
            'INSERT INTO user_model(email, password, activationLink) VALUES ($1, $2, $3) RETURNING * ',
            [email, password, activationLink]);
        return answer.rows[0] ? answer.rows[0] : undefined;
    }

    async save(user) {
        const answer = await db.query({
            text: 'UPDATE user_model SET isactivated = $1 WHERE id = $2 RETURNING *',
            values: [user.isActivated, user.id]
        });
        return answer.rows[0] ? answer.rows[0] : undefined;
    }
}

module.exports = new UserModel();