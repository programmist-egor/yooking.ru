import { createSlice } from '@reduxjs/toolkit';


const dataBooking = createSlice({
    name: 'dataBooking',
    initialState: {
        dataBooking: null,
        updateNumber: null,
        updateUser: null,
        numberId: null,
        userId: null,
    },
    reducers: {
        setDataBookingHandler(state, action) {
            const {numberId, dataBooking, updateNumber, userId, updateUser} = action.payload
            state.dataBooking = dataBooking
            state.updateNumber = updateNumber
            state.updateUser = updateUser
            state.numberId = numberId
            state.userId = userId
        },
    },

});
export const {
    setDataBookingHandler,
} = dataBooking.actions
export default dataBooking.reducer;


