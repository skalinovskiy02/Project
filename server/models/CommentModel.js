const db = require('../db')

class CommentsModel{
    async getCommentsByFlat(id) {
        const answer = await db.query(
            {
                text: `SELECT comment_model.id, userid, flatid, text, date, email, rate
                    FROM comment_model, user_model
                    WHERE flatid = $1 AND user_model.id = userid`,
                values: [id]
            })
        return answer.rows[0] ? answer.rows : [];
    }

    async addCommentToFlat(comment) {
        const answer = await db.query(
            {
                text:'INSERT INTO comment_model(userid, flatid, text, date, rate)' +
                    'VALUES ($1, $2, $3, $4, $5) RETURNING *',
                values: [comment.userid, comment.flatid, comment.text, comment.date, comment.rate]
            })
        return answer.rows[0] ? answer.rows[0] : undefined;
    }
}

module.exports = new CommentsModel();