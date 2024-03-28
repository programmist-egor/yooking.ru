import {$api} from "../http"

const UsersService = {
    // Получить данные всех пользователей из таблицы user_yooking
    getAllUsersYooking: async () => {
        try {
            const response = await $api.get('/management/user/yooking');
            console.log("response",response);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch users from user_yooking table');
        }
    },

    // Получить данные одного пользователя из таблицы user_extranet
    getUserYooking: async (path, userId) => {
        try {
            const response = await $api.get(`/${path}/user/get_by_id/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch users from user_extranet table');
        }
    },
    // Обновить данные пользователя из таблицы user_yooking по ID
    updateUserYooking: async (path, userId, dataUserYooking) => {
        try {
            console.log("SERVICE",dataUserYooking);
            const response = await $api.put(`/${path}/user/yooking/${userId}`, {dataUserYooking});
            return response.data;
        } catch (error) {
            throw new Error('Failed to update user in user_yooking table');
        }
    },

    // Обновить данные пользователя из таблицы user_extranet по ID
    generateCode: async (path,userId) => {
        try {
            const response = await $api.put(`/${path}/user/yooking/code/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update code in user_extranet table');
        }
    },
};

export default  UsersService;