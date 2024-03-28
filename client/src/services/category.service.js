import {$api} from "../http"


const CategoryService = {
    getAllCategoryNumber: async (path, hotelId) => {
        try {
            const response = await $api.get(`/${path}/categories/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch category from category table');
        }
    },
    getOneCategoryNumber: async (path, categoryId) => {
        try {
            const response = await $api.get(`/${path}/category/${categoryId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch category from category table');
        }
    },
    createCategoryNumber: async (categoryData) => {
        try {
            const response = await $api.post(`/setting_object/category`, {categoryData});
            return response.data;
        } catch (error) {
            throw new Error('Failed to create category from category table');
        }
    },
    updateCategory: async (categoryId, categoryData) => {
        try {
            const response = await $api.put(`/setting_object/category/sale/${categoryId}`, {categoryData});
            return response.data;
        } catch (error) {
            throw new Error('Failed to update category from category table');
        }
    },
    updateCategoryNumber: async (categoryId, categoryData, condition) => {
        try {
            const response = await $api.put(`/setting_object/add__del/${categoryId}`, {categoryData, condition});
            return response.data;
        } catch (error) {
            throw new Error('Failed to update category from category table');
        }
    },
    updateCategoryNumberLimit: async (categoryLimitId, categoryData) => {
        try {
            const response = await $api.put(`/setting_object/category/${categoryLimitId}`, {categoryData});
            return response.data;
        } catch (error) {
            throw new Error('Failed to update limit category from category table');
        }
    },
    deleteCategoryNumber: async (categoryId) => {
        try {
            const response = await $api.delete(`/setting_object/category/${categoryId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete category from category table');
        }
    },
    deleteAllCategoryNumber: async (hotelId) => {
        try {
            const response = await $api.delete(`/main/categories/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete all category from category table');
        }
    },
}

export default CategoryService