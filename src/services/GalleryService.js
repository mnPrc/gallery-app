import HttpService from "./HttpService";

class GalleryService extends HttpService{
    getAll = async (page = 0) => {
        let endpoint = `/galleries/?page=${page}`;

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

    addComment = async({ gallery_id, comment }) => {
        const { data } = await this.client.post(`/galleries/${gallery_id}/comments`, comment)

        return data;
    }

    deleteComment = async (comment_id) => {
        const { data } = await this.client.delete(`/comments/${comment_id}`);

        return data;
    }
}

export default new GalleryService();