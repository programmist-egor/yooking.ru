import {$api} from "../http"


 const NumberService = {
     getAllNumbers: async (path,hotelId) => {
         try {
             const response = await $api.get(`${path}/numbers/${hotelId}`);
             console.log("response",response);
             return response.data;
         } catch (error) {
             throw new Error('Failed to fetch numbers from number table');
         }
     },
     getAllHotelIdNumbers: async (path, hotelIds) => {
         try {
             const response = await $api.post(`${path}/numbers/hotels`, {hotelIds});
             console.log("response",response);
             return response.data;
         } catch (error) {
             throw new Error('Failed to fetch numbers from number table');
         }
     },
     getNumberById: async (path,numberId) => {
         try {
             const response = await $api.get(`/${path}/number_one/${numberId}`);
             console.log("numberId",numberId);
             console.log("response",response);
             return response.data;
         } catch (error) {
             throw new Error('Failed to fetch numbers from number table');
         }
     },
     createNumber: async (dataNumber) => {
         try {
             const response = await $api.post('/setting_object/numbers', {dataNumber});
             return response.data;
         } catch (error) {
             throw new Error('Failed to create numbers from number table');
         }
     },
     updateNumber: async (numberId, dataNumber) => {
         try {
             const response = await $api.put(`/setting_number/numbers/${numberId}`, {dataNumber});
             return response.data;
         } catch (error) {
             throw new Error('Failed to update numbers from number table');
         }
     },
     deleteNumberById: async (numberId, categoryId) => {
         try {
             const response = await $api.post(`/setting_object/numbers/${numberId}`, {categoryId});
             return response.data;
         } catch (error) {
             throw new Error('Failed to delete number from number table');
         }
     },
     deleteNumbersByLastCategory: async (id) => {
         try {
             const response = await $api.delete(`/setting_object/numbers/${id}`);
             return response.data;
         } catch (error) {
             throw new Error('Failed to update numbers from number table');
         }
     },
     deleteAllNumbersByCategory: async (categoryId) => {
         try {
             const response = await $api.delete(`/setting_object/numbers/${categoryId}`);
             return response.data;
         } catch (error) {
             throw new Error('Failed to update numbers from number table');
         }
     },
     deleteAllNumberByObject: async (hotelId) => {
         try {
             const response = await $api.delete(`/main/numbers/${hotelId}`);
             return response.data;
         } catch (error) {
             throw new Error('Failed to delete numbers at object from number table');
         }
     },
}

export default NumberService;