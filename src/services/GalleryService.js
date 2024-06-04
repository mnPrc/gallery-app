import HttpService from "./HttpService";

class GalleryService extends HttpService{
    getAll = async (page = 0, user_id = '', term = '') => {
        let endpoint = `/galleries/?page=${page}`;

        if(user_id){
            endpoint +=`&user_id=${user_id}`;
        }

        if(term){
            endpoint += `&term=${term}`;
        }
        const { data } = await this.client.get(endpoint);
        
        return data;
    }

    get = async (id) => {
        const { data } = await this.client.get(`/galleries/${id}`);
    
        return data;
    }

    create = async (newGallery) => {
        const { data } = await this.client.post('/galleries', newGallery);

        return data;
    }

    update = async (gallery_id, newGallery) => {
        const { data } = await this.client.put(`/galleries/${gallery_id}`, newGallery);

        return data;
    }

    delete = async (id) => {
        const { data } = await this.client.delete(`/galleries/${id}`);

        return data;
    }

    getGalleryComments = async (gallery_id, sort = 'created_at', order = 'desc') => {
        const { data } = await this.client.get(`/galleries/${gallery_id}/comments`, {params: {sort, order}});

        return data;
    }
    
    addComment = async (content) => {
        const { data } = await this.client.post(`/galleries/${content.id}/comments`, content.comment);

        return data;
    }

    deleteComment = async (content) => {
        await this.client.delete(`/comments/${content.comment}`);

        return content.comment;
    }

    likeComment = async (comment_id) => {
        const { data } = await this.client.post(`/comments/${comment_id}/like`);
        
        return data;
    }

    dislikeComment = async (comment_id) => {
        const { data } = await this.client.post(`/comments/${comment_id}/dislike`);
        
        return data;
    }

    getAllUnapprovedComments = async() => {
        const { data } = await this.client.get('/admin/comments');

        return data;
    }

    adminApproveComment = async (comment_id) => {
        const { data } = await this.client.post(`/admin/comments/${comment_id}`);

        return data;

    }

    getWishlist = async () => {
        const { data } = await this.client.get('/wishlist');
        
        return data;
    }

    createWishlist = async (gallery_id) => {
        const { data } = await this.client.post(`/galleries/${gallery_id}/wishlist`);

        return data;
    }

    deleteGalleryFromWishlist = async (gallery_id) => {
        const { data } = await this.client.delete(`/wishlist/${gallery_id}`);

        return data;
    }

    buy = async (gallery_id) => {
        const { data } = await this.client.post(`/galleries/${gallery_id}/buy`);

        return data;
    }
}

const galleryService = new GalleryService();
export default galleryService;;