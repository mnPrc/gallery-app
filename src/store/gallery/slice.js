import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getGalleries: () => {},
    getGallery: () => {},
    createGallery: () => {},
    updateGallery: () => {},
    deleteGallery: () => {},
    addComment: () => {},
    deleteComment: () => {},
};

const galleriesSlice = createSlice({
    name: 'galleries',
    initialState: {
      page: {
        data: [],
        current_page: 0,
        last_page: 0,
      },
      gallery: {},
      newGallery: {
        name: '',
        description: '',
        images: [],
      },
      createGalleryErrors: [],
      createCommentErrors: [],

    },

    reducers: {
        setGalleries(state, action) {
            state.page = action.payload;
        },

        setGallery(state, action) {
            state.gallery = action.payload;
        },
        
        setPaginated(state, action) {
            state.page.data = [...state.page.data, ...action.payload.data];
            state.page.current_page = action.payload.current_page;
        },

        setCreateGallery(state, action) {
            state.createGallery = action.payload;
        },

        setGalleriesWithNewGallery(state, action) {
            state.page.data = [...state.page.data, action.payload];
        },

        setCreateGalleryErrors(state, {payload}) {
            state.createGalleryErrors = payload;
        },

        setGalleryWithNewComment(state, action) {
            state.gallery = {
                ...state.gallery,
                comments: [...state.gallery.comments, action.payload],
            };
        },

        setGalleryWithoutComment(state){
            state.gallery = state.gallery;
        },

        setCreateCommentError(state, {payload}) {
            state.createCommentErrors = payload;
        },

        ...middlewareActions,
    },
});

export const {
    setGalleries, 
    setGallery,
    setPaginated,
    getGalleries,
    getGallery,
    createGallery,
    updateGallery,
    deleteGallery,
    setCreateGallery,
    setGalleriesWithNewGallery,
    setCreateGalleryErrors,
    addComment,
    deleteComment,
    setGalleryWithNewComment,
    setGalleryWithoutComment,
    setCreateCommentError

} = galleriesSlice.actions;

export default galleriesSlice.reducer;