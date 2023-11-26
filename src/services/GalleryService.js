import HttpService from "./HttpService";

class GalleryService extends HttpService{
    getAll = async (page = 0) => {
        let endpoint = `galleries/?page=${page}`;

        const { data } = await this.client.get(endpoint);
        
        return data;
    }

    get = async (id) => {
        const { data } = await this.client.get(`/galleries/${id}`);
        return data;
    }
}

export default new GalleryService();