const FlatService = require('../service/flat-service');
const ImageService = require('../service/image-service')
const AuthError = require("../exeptions/api-error");

class flatController{

    async postFlat(req, res, next){
        try{
            let flat = req.body;
            const user = req.user;
            flat.owner = user.id;
            flat.coordinates = flat.coordinates.split(',');
            flat.rating = 0;
            const photos = req.files;
            const links = await ImageService.addPhotos(photos);
            if(!links) {
                return next(AuthError.BadRequest('Нет фото.'));
            }
            flat.photos = links;
            const flatId = await FlatService.postFlat(flat)
            res.status(200).send(flatId);
        }catch (e){
            next(e);
        }
    }

    async getNearestFlats(req, res, next){
        try{
            const {point, limit} = req.query;
            let flats = await FlatService.getNearestFlats(point, limit);
            res.status(200).send(flats);
        }catch (e){
            next(e);
        }

    }

    async getFlatById(req, res, next){
        try{
            const {id} = req.query;
            let flat = await FlatService.getFlatById(id);
            res.status(200).send(flat);
        }catch (e){
            next(e);
        }
    }
}


module.exports = new flatController();