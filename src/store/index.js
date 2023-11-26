import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sagas from "./rootSaga";
import userReducer from "./auth/slice";
import galleriesReducer from "./gallery/slice";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: { auth: userReducer, gallery: galleriesReducer},
    middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware],
});

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga])
}