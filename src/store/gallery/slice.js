import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getGalleries: () => {},
    getGallery: () => {},
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

        ...middlewareActions,
    },
});

export const {
    setGalleries, 
    setGallery,
    setPaginated,
    getGalleries,
    getGallery,
} = galleriesSlice.actions;

export default galleriesSlice.reducer;