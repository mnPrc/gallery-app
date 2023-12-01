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

        addCommentToGallery: (state, action) => {
            state.gallery.comments.push(action.payload);
        },

        deleteCommentFromGallery: (state, action) => {
            state.gallery.comments = state.gallery.comments.filter(
                (comment) => comment.id !== action.payload
            );
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
    addCommentToGallery,
    deleteCommentFromGallery,
    setCreateCommentError

} = galleriesSlice.actions;

export default galleriesSlice.reducer;