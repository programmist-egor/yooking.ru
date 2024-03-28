import {$api} from "../http"


const DocumentConfirmService = {
    getDocumentConfirm: async () => {
        try {
            const response = await $api.get('/contract/document_confirm');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch statistic from statistic table');
        }
    },
    getDocumentConfirmById: async ( hotelId) => {
        try {
            const response = await $api.get(`/contract/object/document_confirm/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch statistic from statistic table');
        }
    },
    getDocumentConfirmByUserId: async ( userId) => {
        try {
            const response = await $api.get(`/contract/document_confirm/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch statistic from statistic table');
        }
    },
    createDocumentConfirm: async ( documentInfo) => {
        try {
            const response = await $api.post(`/contract/document_confirm`, {documentInfo});
            return response.data;
        } catch (error) {
            throw new Error('Failed to create statistic from statistic table');
        }
    },
    updateDocumentConfirm: async (hotelId, documentInfo) => {
        try {
            const response = await $api.put(`/contract/document_confirm/${hotelId}`, {documentInfo});
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch statistic from statistic table');
        }
    },
    deleteDocumentConfirm: async (idDoc) => {
        try {
            const response = await $api.delete(`/contract/document_confirm/${idDoc}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch statistic from statistic table');
        }
    },
}

export default DocumentConfirmService