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

    addComment = async (content) => {
        const { data } = await this.client.post(`/galleries/${content.id}/comments`, content.comment);

        return data;
    }

    deleteComment = async (content) => {
        const { data } = await this.client.delete(`/comments/${content.comment}`);

        return content.comment;
    }
}

export default new GalleryService();