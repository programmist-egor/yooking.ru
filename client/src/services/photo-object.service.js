import {$api} from "../http"


const PhotoObjectService = {
    getAllPhotosObject: async (path, hotelId) => {
        try {
            const response = await $api.get(`/${path}/by_hotelId/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch object photos from photos object table');
        }
    },
    createPhotoObject: async (path,objectPhotos) => {
        try {
            const response = await $api.post(`/${path}/object/photos`, {objectPhotos});
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch object photos from photos object table');
        }
    },
    deletePhotoObject: async (path,idImg) => {
        try {
            const response = await $api.delete(`/${path}/object/photo/${idImg}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete object photo from photos object table');
        }
    },
    deleteAllPhotosObject: async (hotelId) => {
        try {
            const response = await $api.delete(`/object/photos/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete object photos from photos object table');
        }
    },
}

export default PhotoObjectService