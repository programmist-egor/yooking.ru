import {$api} from "../http"


const ObjectService = {
    getAllObject: async () => {
        try {
            const response = await $api.get(`/`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch objects from object table');
        }
    },
    getObject: async (path, hotelId) => {
        try {
            const response = await $api.get(`/${path}/object/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch object from object table');
        }
    },
    getObjectByUserId: async ( userId) => {
        try {
            const response = await $api.get(`/objects/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch object from object table');
        }
    },
    searchObject: async (requestParameters) => {
        try {
            const response = await $api.post(`/hotels_map`, {requestParameters});
            return response.data;
        } catch (error) {
            throw new Error('Failed to search object from object table');
        }
    },
    updateObject: async (path, hotelId, dataObjectSetting) => {
        try {
            const response = await $api.put(`/${path}/object/${hotelId}`, {dataObjectSetting});
            return response.data;
        } catch (error) {
            throw new Error('Failed to update object from object table');
        }
    },
    deleteObject: async (hotelId) => {
        try {
            const response = await $api.delete(`/object/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete object from object table');
        }
    },
}

export default ObjectService