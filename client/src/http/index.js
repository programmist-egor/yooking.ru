import axios from "axios";

export const API_URL =  "http://localhost:5002";


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})




$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (!error.response) {
            // Обработка ошибок сети
            console.log("Network error:", error.message);
            throw error;
        }

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
                if (response.data && response.data.accessToken) {
                    localStorage.setItem('token', response.data.accessToken);
                    // Повторный запрос с обновленным токеном
                    return $api.request(originalRequest);
                } else {
                    console.log("Access token not found in refresh response");
                    throw new Error("Access token not found");
                }
            } catch (e) {
                console.log("Failed to refresh token:", e.message);
                throw e;
            }
        }

        throw error;
    }
);
export {$api}
