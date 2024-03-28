import ApiError from "../exceptions/api-error.js";
import RatingService from "../service/rating-service.js";


class RatingController {
    async getAllRatingObject(req, res, next) {
        const hotelId = req.params.hotelId;
        try {
            if (!hotelId) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const data = await RatingService.getAllRatingObject(hotelId)
            return res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async getAllCityRatingObject(req, res, next) {
        const city = req.params.city;
        try {
            if (!city) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const data = await RatingService.getAllCityRatingObject(city)
            return res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async createRatingObject(req, res, next) {
        try {
            const {rating} = req.body;
            if (!rating) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const data = await RatingService.createRatingObject(rating)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

}

export default new RatingController()