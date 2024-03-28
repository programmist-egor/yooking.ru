import {$api} from "../http"


const RatingService = {
    getAllRatingObject: async (hotelId) => {
        try {
            const response = await $api.get(`/hotel/rating/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch object photos from photos object table');
        }
    },
    getAllCityRatingObject: async (path,city) => {
        try {
            const response = await $api.get(`/${path}/rating/city/${city}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch object photos from photos object table');
        }
    },
    createRatingObject: async (rating) => {
        try {
            const response = await $api.post(`/hotel/rating`, {rating});
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch object photos from photos object table');
        }
    },
    // deleteRatingObject: async (path,idImg) => {
    //     try {
    //         const response = await $api.delete(`/${path}/object/photo/${idImg}`);
    //         return response.data;
    //     } catch (error) {
    //         throw new Error('Failed to delete object photo from photos object table');
    //     }
    // },
}

export default RatingService