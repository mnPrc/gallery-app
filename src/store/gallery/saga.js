import {put, call, takeLatest} from 'redux-saga/effects';
import GalleryService from '../../services/GalleryService';

import {
    setGalleries,
    setGallery,
    setPaginated,
    getGalleries,
    getGallery,
    createGallery,
    updateGallery,
    deleteGallery,
    setGalleriesWithNewGallery,
    setCreateGalleryErrors,
    addCommentToGallery,
    deleteCommentFromGallery,
    addComment,
    deleteComment,
    setCreateCommentError
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

function* createGalleryHandler(action) {
    try {
        const newGallery = yield call(GalleryService.create, action.payload);
        
        yield put(setGalleriesWithNewGallery(newGallery));
    } catch(error) {
        const errors = [];
		Object.values(error.response.data.errors).map((error) =>
			errors.push(error)
		);
		yield put(setCreateGalleryErrors(errors));
    }
}


function* updateGalleryHandler(action) {
    try{
        const gallery = yield call(
            GalleryService.update,
            action.payload.newGallery.id,
            action.payload.newGallery
        );

        yield put(setGalleriesWithNewGallery(gallery));
    } catch(error) {
        console.log(error);
    }
}

function* deleteGalleryHandler(action) {
    try {
        yield call(GalleryService.delete, action.payload);
        const gallery = yield call(GalleryService.getAll);
        
        yield put(setGalleries(gallery));
    } catch(error){
        console.log(error);
    }
}

function* addCommmentHandler(action) {
    try {
        const newComment = yield call(GalleryService.addComment, action.payload);

        yield put(addCommentToGallery(newComment));
    } catch(error){
        yield put(setCreateCommentError(error.response.data.message));
    }
}

function* deleteCommentHandler(action) {
    try{
        const comment = yield call(GalleryService.deleteComment, action.payload);

        yield put(deleteCommentFromGallery(comment));
    } catch(error) {
        alert(error.message);
    }
}

export function* watchForGalleriesSagas() {
    yield takeLatest(getGalleries.type, getGalleriesHandler);
    yield takeLatest(getGallery.type, getGalleryHandler);
    yield takeLatest(createGallery.type, createGalleryHandler);
    yield takeLatest(updateGallery.type, updateGalleryHandler);
    yield takeLatest(deleteGallery.type, deleteGalleryHandler);
    yield takeLatest(addComment.type, addCommmentHandler);
    yield takeLatest(deleteComment.type, deleteCommentHandler);
}