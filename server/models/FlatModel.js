const db = require('../db')


class FlatModel{
    async postFlat(flat){
        const answer = await db.query(
            {
                text:'INSERT INTO flat_model(title, type, address, price, photos, description, coordinates, owner, active, rating)' +
                    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
                values: [flat.title, flat.type, flat.address, flat.price, flat.photos, flat.description, flat.coordinates, flat.owner, true, flat.rating]
            })
        return answer.rows[0] ? answer.rows[0] : undefined;
    }
    async getNearestFlats(point, limit){
        const answer = await db.query(
            {
                text:'SELECT * FROM get_nearest_flats($1, $2)',
                values: [point, limit]
            })
        return answer.rows[0] ? answer.rows : undefined;
    }

    async getFlatById(id){
        const answer = await db.query(
            {
                text:'SELECT * FROM flat_model WHERE id = $1',
                values: [id]
            })
        return answer.rows[0] ? answer.rows[0] : undefined;
    }
}

module.exports = new FlatModel();