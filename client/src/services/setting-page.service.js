import {$api} from "../http"

const SettingPageService = {
    getSettingPage: async () => {
        try {
            const response = await $api.get('/setting_page/all');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch statistic from statistic table');
        }
    },
}
export default SettingPageService
