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
    setCreateGalleryErrors,
    addCommentToGallery,
    deleteCommentFromGallery,
    addComment,
    deleteComment,
    getComments,
    setComments,
    likeComment,
    likeCommentInGallery,
    dislikeComment,
    dislikeCommentInGallery,
    getAllUnapprovedComments,
    setUnapprovedComments,
    adminApproveComment,
    setAdminApproveComments,
    setCreateCommentError,
    getWishlist,
    setWishlist,
    createWishlist,
    deleteGalleryFromWishlist,
    setWishlistWithNewGallery,
    setWishlistWithoutGallery,
    buyGallery,
    setBoughtGalleryToBuyer,
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

        if (action.payload.meta && action.payload.meta.onSuccess){
            yield call(action.payload.meta.onSuccess);
        }
    } catch(error) {
        const errors = [];
        if(error.response && error.response.data && error.response.data.errors){
            Object.values(error.response.data.errors).forEach((error) => 
                errors.push(error)
            );
        }
        yield put(setCreateGalleryErrors(errors));
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

        if (action.payload.meta && action.payload.meta.onSuccess){
            yield call(action.payload.meta.onSuccess);
        }
    } catch(error) {
        const errors = [];
        if(error.response && error.response.data && error.response.data.errors){
            Object.values(error.response.data.errors).forEach((error) => 
                errors.push(error)
            );
        }
        yield put(setCreateGalleryErrors(errors));
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

function* getCommentsHandler(action) {
    try{
        const comments = yield call(
            galleryService.getGalleryComments, 
            action.payload.gallery_id, 
            action.payload.sort,
            action.payload.order 
        );
        yield put(setComments(comments));
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

function* likeCommentHandler(action) {
    try{
        const like = yield call(galleryService.likeComment, action.payload);
        
        yield put(likeCommentInGallery(like));
    } catch(error){
        console.log(error.message);
    }
}

function* getAllUnapprovedCommentsHandler(action){
    try{
        const data = yield call(galleryService.getAllUnapprovedComments, action.payload);
        
        yield put(setUnapprovedComments(data));
    }catch(error){
        console.log(error)
    }
}

function* dislikeCommentHandler(action) {
    try{
        const dislike = yield call(galleryService.dislikeComment, action.payload);

        yield put(dislikeCommentInGallery(dislike));
    } catch(error){
        console.log(error.message);
    }
}

function* approveCommentHandler(action) {
    try{
        const response = yield call(galleryService.adminApproveComment, action.payload);
        
        yield put(setAdminApproveComments(response));
    }catch(error){
        console.log(error);
    }
}

function* getWishlistHandler(action) {
    try{
        const wishlist = yield call(galleryService.getWishlist, action.payload);
        yield put(setWishlist(wishlist));
    } catch(e){
        console.log(error);
    }
}

function* createWishlistHandler(action) {
    try{
        const wishlist = yield call(galleryService.createWishlist, action.payload);
        yield put(setWishlistWithNewGallery(wishlist));
    } catch(e){
        console.log(e);
    }
}

function* deleteGalleryFromWishlistHandler(action) {
    try{
        const wishlist = yield call(galleryService.deleteGalleryFromWishlist, action.payload);
        yield put(setWishlistWithoutGallery(wishlist))
    } catch(e){
        console.log(e);
    }
}

function* buyGalleryHandler(action) {
    try {
        const { galleryId, buyerId } = action.payload;
        yield call(galleryService.buy, galleryId);
        yield put(setBoughtGalleryToBuyer({ galleryId, buyerId }));        
    } catch(e) {
        console.log(e);
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
    yield takeLatest(getComments.type, getCommentsHandler);
    yield takeLatest(likeComment.type, likeCommentHandler);
    yield takeLatest(dislikeComment.type, dislikeCommentHandler);
    yield takeLatest(getAllUnapprovedComments.type, getAllUnapprovedCommentsHandler);
    yield takeLatest(adminApproveComment.type, approveCommentHandler);
    yield takeLatest(getWishlist.type, getWishlistHandler);
    yield takeLatest(createWishlist.type, createWishlistHandler);
    yield takeLatest(deleteGalleryFromWishlist.type, deleteGalleryFromWishlistHandler);
    yield takeLatest(buyGallery.type, buyGalleryHandler);
}