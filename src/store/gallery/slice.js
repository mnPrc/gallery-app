import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getGalleries: () => {},
    getGallery: () => {},
    createGallery: () => {},
    updateGallery: () => {},
    deleteGallery: () => {},
    addComment: () => {},
    deleteComment: () => {},
    getWishlist: () => {},
    createWishlist: () => {},
    deleteGalleryFromWishlist: () => {},
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
        first_image_url:'',
        images: [],
      },
      createCommentErrors: [],
      user_id: null,
      term: null,
      wishlist: [],
    },

    reducers: {
        setGalleries(state, action) {
            state.page = action.payload;
        },

        setGallery(state, action) {
            state.gallery = action.payload;
        },

        setSearchTerm(state, action){
            state.term = action.payload;
        },
        
        setSearchUserId(state, action){
            state.user_id = action.payload;
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

        setResetForm(state) {
            state.newGallery = {};
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

        setWishlist(state, action) {
            state.wishlist = action.payload
        },  
    
        setWishlistWithNewGallery(state, action) {
            state.wishlist = [...state.wishlist, action.payload]
        },
    
        setWishlistWithoutGallery(state, action) {
            state.wishlist = state.wishlist.filter(gallery => gallery.id !== action.payload)
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
    setSearchTerm,
    setSearchUserId,
    createGallery,
    updateGallery,
    deleteGallery,
    setCreateGallery,
    setGalleriesWithNewGallery,
    setResetForm,
    addComment,
    deleteComment,
    addCommentToGallery,
    deleteCommentFromGallery,
    setCreateCommentError,
    getWishlist,
    setWishlist,
    createWishlist,
    deleteGalleryFromWishlist,
    setWishlistWithNewGallery,
    setWishlistWithoutGallery,
} = galleriesSlice.actions;

export default galleriesSlice.reducer;