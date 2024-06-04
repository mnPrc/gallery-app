import { call, put, takeLatest} from "redux-saga/effects";
import authService from "../../services/AuthService";
import {
    login, 
    setToken,
    setErrors,
    register,
    logout,
    removeUser,
    setRegisterErrors,
    getActiveUser,
    setActiveUser,
    deposit,
    setDeposit,
    setTransactionErrors,
    setIsAdmin,
    getUsers,
    setUsers,
    manageAdminPriv,
    setManageAdminPriv,
} from "./slice";

function* handleLogin(action) {
    try {
        const data = yield call(authService.login, action.payload.credentials);
        yield put(setToken(data.token));
        
        if (action.payload.meta && action.payload.meta.onSuccess) {
            yield call(action.payload.meta.onSuccess);
        }
    } catch(error) {
            yield put(setErrors(error.response.data.message));
    }
}

function* handleRegister(action) {
    try {
        const data = yield call(authService.register, action.payload.registerUser);
        yield put(setToken(data.token));
        
        if (action.payload.meta && action.payload.meta.onSuccess){
            yield call(action.payload.meta.onSuccess);
        }
    } catch(error) {
        const errors = [];
        Object.values(error.response.data.errors).map((error) => 
            errors.push(error)    
        );
        yield put(setRegisterErrors(errors));
    }
}

function* handleLogout({ payload }){
    try {
        yield call(authService.logout);
        yield put(setToken(null));
        yield put(removeUser());

        if (payload.meta && payload.meta.onSuccess) {
            yield call(payload.meta.onSuccess);
        }
    }  catch(error){
        console.log(error);
    }
}

function* getUsersHandler(action){
    try{
        const data = yield call(authService.getAllUsers, action.payload);
        yield put(setUsers(data));
    } catch(error){
        console.log(error);
    }
}

function* getActiveUserHandler(){
    try {
        const data = yield call(authService.getMyProfile);
        yield put(setActiveUser(data));
        yield put(setIsAdmin(data.isAdmin));
    }  catch(error) {
        console.log(error);
    }
}

function* manageAdminPrivHandler(action){
    try {
        const data = yield call(authService.manageAdminPrivileges, action.payload);
        yield put(setManageAdminPriv(data));
    } catch(error){
        console.log(error);
    }
}

function* depositMoneyHandler(action){
    try {
        const data = yield call(authService.depositMoney, action.payload);
        yield put(setDeposit(data));
        yield put(getActiveUser());
    } catch(error) {
        yield put(setTransactionErrors(error.response.data.message));
    }
}

export function* watchForSagas() {
    yield takeLatest(login.type, handleLogin);
    yield takeLatest(register.type, handleRegister);
    yield takeLatest(logout.type, handleLogout);
    yield takeLatest(getUsers.type, getUsersHandler);
    yield takeLatest(getActiveUser.type, getActiveUserHandler);
    yield takeLatest(manageAdminPriv.type, manageAdminPrivHandler);
    yield takeLatest(deposit.type, depositMoneyHandler);
}