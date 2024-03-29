import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    userId:localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null,
    isAuth: localStorage.getItem('isAuth') || null,
    isActivated: localStorage.getItem('isActivated') || null,
    userEmail: localStorage.getItem('userEmail') || null,
    role: localStorage.getItem('role') || null,
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.accessToken;
            state.userEmail = action.payload.user.email;
            state.isActivated = action.payload.user.isActivated;
            state.userId = action.payload.user.id;
            state.role = action.payload.user.role;
            state.isAuth = true;
            state.error = null;
            localStorage.setItem('token', action.payload.accessToken);
            localStorage.setItem('userEmail', action.payload.user.email);
            localStorage.setItem('isActivated', action.payload.user.isActivated);
            localStorage.setItem('userId', action.payload.user.id)
            localStorage.setItem('role', action.payload.user.role);
            localStorage.setItem('isAuth', "true");
        },
        loginFailure: (state, action) => {
            state.token = null;
            state.isAuth = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.error = null;
            state.isAuth = false;
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('isActivated');
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("isAuth");
        },
        isAuth: (state, action) => {
                if(action.payload) {
                    const {accessToken, user} = action.payload
                    state.token = action.payload.accessToken;
                    state.userEmail = action.payload.user.email;
                    state.isActivated = action.payload.user.isActivated;
                    state.userId = action.payload.user.id;
                    state.role = action.payload.user.role;
                    state.isAuth = true;
                    state.error = null;
                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('userId', user.id)
                    localStorage.setItem('isActivated', user.isActivated);
                    localStorage.setItem('userEmail', user.email);
                    localStorage.setItem('role', user.role);
                    localStorage.setItem('isAuth', "true");
                } else {
                    state.token = null;
                    state.userEmail = null;
                    state.isActivated = null;
                    state.error = null;
                    state.userId = null;
                    state.role = null;
                    state.isAuth = false;
                    localStorage.removeItem('userId');
                    localStorage.removeItem('isActivated');
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    localStorage.removeItem("isAuth");

                }
        },
    },
});

export const {
    loginSuccess,
    loginFailure,
    isAuth,
    logout
} = authSlice.actions;

export default authSlice.reducer;