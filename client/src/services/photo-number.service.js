import {$api} from "../http"


const PhotoNumberService = {
    getAllPhotosCategoryNumber: async (path,categoryId) => {
        try {
            const response = await $api.get(`/${path}/numbers/photos/${categoryId}`);
            console.log("NUMBER PHOTOS",response);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch category photos from photos number table');
        }
    },
    getAllPhotosNumber: async (path,numberId) => {
        try {
            const response = await $api.get(`/${path}/number/photos/${numberId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch number photos from photos number table');
        }
    },
    createNumberPhotos: async (numberPhotos) => {
        try {
            const response = await $api.post(`/setting_number/number/photos`, {numberPhotos});
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch number photos from photos number table');
        }
    },
    deleteNumberPhoto: async (path,idImg) => {
        try {
            const response = await $api.delete(`/${path}/number/photo/${idImg}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete number photo from photos number table');
        }
    },
    deleteAllNumberPhotos: async (path,numberId) => {
        try {
            const response = await $api.delete(`/${path}/number/photos/${numberId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete number photos from photos number table');
        }
    },
    deleteAllCategoryNumberPhotos: async (path,categoryId) => {
        try {
            const response = await $api.delete(`/${path}/number/photos/${categoryId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete number photos at category from photos number table');
        }
    },
    deleteAllObjectNumberPhotos: async (hotelId) => {
        try {
            const response = await $api.delete(`/number/photos/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete number photos at category from photos number table');
        }
    },

}

export default PhotoNumberService