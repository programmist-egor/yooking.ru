import {$api} from "../http"


const BookingService = {
    getAllBooking: async () => {
        try {
            const response = await $api.get(`/booking`);
            console.log("response bookings", response);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch bookings from booking table');
        }
    },
    getAllBookingByObject: async (path,hotelId) => {
        try {
            const response = await $api.get(`/${path}/bookings/by_object/${hotelId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch bookings from booking table');
        }
    },
    getBooking: async (id) => {
        try {
            const response = await $api.get(`/booking/booking/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch bookings from booking table');
        }
    },
    createBooking: async (path, numberId,dataBooking, dataNumber,userId, updateUser) => {
        try {
            const response = await $api.post(`/${path}/booking`, {numberId, dataBooking, dataNumber,userId, updateUser});
            return response.data;
        } catch (error) {
            throw new Error('Failed to create booking from booking table');
        }
    },
    updateBooking: async (numberId,id, data, dataNumber) => {
        try {
            const response = await $api.put(`/booking/booking/${id}`, {numberId, data, dataNumber});
            return response.data;
        } catch (error) {
            throw new Error('Failed to update bookings from booking table');
        }
    },
    deleteBooking: async (id, numberId, dataNumber, userId, userUpdate) => {
        try {
            const response = await $api.post(`/booking/booking/delete/${id}`, {numberId, dataNumber, userId,userUpdate });
            console.log("response bookings", response);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete booking from booking table');
        }
    },
}

export default BookingService;