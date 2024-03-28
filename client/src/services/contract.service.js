import {$api} from "../http"


const ContractService = {
    getContract: async () => {
        try {
            const response = await $api.get('/contract');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch statistic from statistic table');
        }
    },
    getContractById: async (path, hotelId) => {
        try {
            const response = await $api.get(`/${path}/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch statistic from statistic table');
        }
    },
    getContractByUserId: async (path, userId) => {
        try {
            const response = await $api.get(`/${path}/contract/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch statistic from statistic table');
        }
    },
    createContract: async ( contractData) => {
        try {
            const response = await $api.post(`/add_object`, {contractData});
            return response.data;
        } catch (error) {
            throw new Error('Failed to create statistic from statistic table');
        }
    },
    updateContract: async (hotelId, contractData) => {
        try {
            const response = await $api.put(`/setting_object/${hotelId}`, {contractData});
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch statistic from statistic table');
        }
    },
    deleteContract: async (hotelId) => {
        try {
            const response = await $api.delete(`/contract/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch statistic from statistic table');
        }
    },
}

export default ContractService