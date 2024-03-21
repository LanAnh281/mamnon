import createApiClient from "./api.service";

class loginService {
    constructor(baseUrl = "/api/children") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getAllChildren(id) {
        return (await this.api.get(`/find/${id}`)).data;
    }
 
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }


}

export default new loginService();
