import {put, call, takeLatest} from 'redux-saga/effects';
import galleryService from '../../services/GalleryService';

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
    addCommentToGallery,
    deleteCommentFromGallery,
    addComment,
    deleteComment,
    setCreateCommentError
} from "./slice";

function* getGalleriesHandler(action) {
    try {
        const galleries = yield call(galleryService.getAll,
            action.payload?.page, 
            action.payload?.user_id,
            action.payload?.term,
            );

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
        const gallery = yield call(galleryService.get, action.payload);
        
        yield put(setGallery(gallery));
    } catch (error){
        console.log(error);
    }
}

function* createGalleryHandler(action) {
    try {
        const newGallery = yield call(galleryService.create, action.payload);
        
        yield put(setGalleriesWithNewGallery(newGallery));
    } catch(error) {
        alert('Title should be at least 2 and at most 255 characters long and images must be in jpg, jpeg or png format')
    }
}


function* updateGalleryHandler(action) {
    try{
        const gallery = yield call(
            galleryService.update,
            action.payload.newGallery.id,
            action.payload.newGallery
        );

        yield put(setGalleriesWithNewGallery(gallery));
    } catch(error) {
        alert('Title should be at least 2 and at most 255 characters long and images must be in jpg, jpeg or png format1');
    }
}

function* deleteGalleryHandler(action) {
    const response = prompt('Are you sure you want to delete gallery, if so type in yes');
        if(response !== 'yes'){
          return
        }
    
    try {
        yield call(galleryService.delete, action.payload);
        const gallery = yield call(galleryService.getAll);
        
        yield put(setGalleries(gallery));
    } catch(error){
        console.log(error);
    }
}

function* addCommmentHandler(action) {
    try {
        const newComment = yield call(galleryService.addComment, action.payload);

        yield put(addCommentToGallery(newComment));
    } catch(error){
        yield put(setCreateCommentError(error.response.data.message));
    }
}

function* deleteCommentHandler(action) {
    const response = prompt('Are you sure you want to delete this comment, if so type in yes');
        if(response !== 'yes'){
          return
        }

    try{
        const comment = yield call(galleryService.deleteComment, action.payload);

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