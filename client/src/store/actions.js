import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, remove, ref, push, get, child } from 'firebase/database';
import getCookie from "../components/hooks/getCookie";
const uid = getCookie("uid")

// Добавление данных в избранное
export const addToFavourites = createAsyncThunk(
    'favourites/add',
    async (data) => {
        const database = getDatabase();
        await push(ref(database, `usersData/${uid}/favorite`), data);
        return data;
    }
);

// Обновление данных из базы данных
export const updateData = createAsyncThunk(
    'data/update',
    async () => {
        const database = getDatabase();
        const snapshot = await get(child(ref(database), `usersData/${uid}/favorite`));
        const data = snapshot.val();
        return data;
    }
);

// Удаление данных из избранного
export const removeFromFavourites = createAsyncThunk(
    'favourites/remove',
    async (itemId) => {
        const database = getDatabase();
        await remove(ref(database, `usersData/${uid}/favorite/${itemId}`));
        return itemId;
    }
);

// Добавление забронированных отелей
export const addBooking = createAsyncThunk(
    'bookings/add',
    async (data) => {
        const database = getDatabase();
        await push(ref(database, `usersData/${uid}/booking`), data);
        return data;
    }
);

// Удаление забронированных отелей
export const removeBooking = createAsyncThunk(
    'bookings/remove',
    async (itemId) => {
        const database = getDatabase();
        await remove(ref(database, `usersData/${uid}/booking/${itemId}`));
        return itemId;
    }
);

// Обновление данных забронированных отелей
export const updateBookingsData = createAsyncThunk(
    'bookings/update',
    async () => {
        const database = getDatabase();
        const snapshot = await get(child(ref(database), `usersData/${uid}/booking`));
        const data = snapshot.val();
        return data;
    }
);

// Добавление списка отлей
export const addHotelList = createAsyncThunk(
    'hotelList/add',
    async (data) => {
        const database = getDatabase();
        await push(ref(database, `usersData/${uid}/hotelList`), data);
        return data;
    }
);

// Удаление списка отелей
export const removeHotelList = createAsyncThunk(
    'hotelList/remove',
    async (itemId) => {
        console.log("Removing itemId:", itemId);
        const database = getDatabase();
        await remove(ref(database, `usersData/${uid}/hotelList/${itemId}`));
        return itemId;
    }
);

// Обновление данных списка отелей
export const updateHotelListData = createAsyncThunk(
    'hotelList/update',
    async () => {
        const database = getDatabase();
        const snapshot = await get(child(ref(database), `usersData/${uid}/hotelList`));
        const data = snapshot.val();
        return data;
    }
);
