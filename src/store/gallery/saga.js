import {put, call, takeLatest} from 'redux-saga/effects';
import GalleryService from '../../services/GalleryService';

import {
    setGalleries,
    setGallery,
    setPaginated,
    getGalleries,
    getGallery,
} from "./slice";

function* getGalleriesHandler(action) {
    try {
        const galleries = yield call(GalleryService.getAll, action.payload.page);

        if(action.payload?.page > 1){
            yield put(setPaginated(galleries));
        } else{
            yield put(setGalleries(galleries));
        }
    } catch (error){
        console.log(error);
    }
}

function* getGalleryHandler(action) {
    try {
        const gallery = yield call(GalleryService.get, action.payload);
        
        yield put(setGallery(gallery));
    } catch (error){
        console.log(error);
    }
}

export function* watchForGalleriesSagas() {
    yield takeLatest(getGalleries.type, getGalleriesHandler);
    yield takeLatest(getGallery.type, getGalleryHandler);
  }