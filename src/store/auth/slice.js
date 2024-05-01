import { createSlice } from "@reduxjs/toolkit";

const MiddlewareActions = {
    login: () => {},
    register: () => {},
    logout: () => {},
    getActiveUser: () => {},
    deposit: () => {},
    getUsers: () => {},
    manageAdminPriv: () => {},
};

const token = localStorage.getItem("token");

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:{},
        token: token,
        loginErrors: [],
        registerErrors: [],
        money: 0,
        isAdmin: false,
        users: [],
    },

    reducers: {
        setToken(state, action){
            state.token = action.payload;
        },
        removeUser(state){
            state.user = {};
        },
        setErrors(state, action) {
            state.loginErrors = action.payload;
        },
        setRegisterErrors(state, {payload}){
            state.registerErrors = payload;
        },
        setActiveUser(state, action) {
            state.user = action.payload;
        },
        setDeposit(state, action){
            state.money += action.payload;
        },
        setIsAdmin(state, action){
            state.isAdmin = action.payload;
        },
        setUsers(state, action){
            state.users = action.payload;
        },
        setManageAdminPriv(state, action) {
            state.users = state.users.map(user => {
                if(user.id === action.payload){
                    if(user.isAdmin) {
                        return {...user, isAdmin: false};
                    }else{
                        return {...user, isAdmin: true};
                    }
                }
                return user;
            });
        },
        ...MiddlewareActions,
    }
});

export const {
    setToken,
    removeUser,
    login,
    setErrors,
    register,
    logout,
    setRegisterErrors,
    getActiveUser,
    setActiveUser,
    deposit,
    setDeposit,
    setIsAdmin,
    getUsers,
    setUsers,
    manageAdminPriv,
    setManageAdminPriv
} = userSlice.actions;

export default userSlice.reducer;