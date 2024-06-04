export const selectGalleries = (state) => state.gallery.page;

export const selectGallery = (state) => state.gallery.gallery;

export const selectUnapprovedComments = (state) => state.gallery.unapproved_comments;

export const selectCreateGalleryErrors = (state) => state.gallery.createGalleryErrors;

export const selectCreateCommentErrors = (state) => state.gallery.createCommentErrors;

export const selectSearchTerm = (state) => state.gallery.term;

export const selectSearchUserId = (state) => state.gallery.user_id;

export const selectWishlist = (state) => state.gallery.wishlist;