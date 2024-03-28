import Rating from "../models/rating-model.js";

class RatingService {
    async getAllRatingObject(hotelId) {
        try {
            const ratings = await Rating.findAll({where: {hotelId: hotelId}});
            return { success: true, data: ratings };
        } catch (error) {
            console.error("Error in getAllRatingObject:", error);
            return { success: false, error: "Failed to get ratings" };
        }
    }
    async getAllCityRatingObject(city) {
        try {
            const ratings = await Rating.findAll({where: {city: city}});
            return { success: true, data: ratings };
        } catch (error) {
            console.error("Error in getAllRatingObject:", error);
            return { success: false, error: "Failed to get ratings" };
        }
    }
    async createRatingObject(rating) {
        try {
            await Rating.create(rating);
            return { success: true, message: "Rating created successfully" };
        } catch (error) {
            console.error("Error in createRatingObject:", error);
            return { success: false, error: "Failed to create rating" };
        }
    }
}

export default new RatingService()


