const FlatModel = require('../models/FlatModel')

class flatService {

    async postFlat(flat) {
        let flats = await FlatModel.postFlat(flat)
        return flats;
    }

    async getNearestFlats(point = [55, 55], limit) {
        let flats = await FlatModel.getNearestFlats(point, limit)
        return flats;
    }

    async getFlatById(id){
        let flat = await FlatModel.getFlatById(id)
        return flat;
    }
}

module.exports = new flatService();