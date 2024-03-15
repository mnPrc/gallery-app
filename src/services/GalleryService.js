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

    addComment = async (content) => {
        const { data } = await this.client.post(`/galleries/${content.id}/comments`, content.comment);

        return data;
    }

    deleteComment = async (content) => {
        await this.client.delete(`/comments/${content.comment}`);

        return content.comment;
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