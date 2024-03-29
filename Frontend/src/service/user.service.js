

import createApiClient from "./api.service";

class accountService {
    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (
            await this.api.post("/", data, {
                headers: {
                    "Content-Type": "multipart/form-data", // Đảm bảo định dạng dữ liệu là multipart/form-data
                },
            })
        ).data;
    }
    async createParent(data) {
        return (
            await this.api.post("/parent/children", data) ).data;
       
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getParent(id) {
        return (await this.api.get(`/parent/children/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data", // Đảm bảo định dạng dữ liệu là multipart/form-data
            },
        })).data;
    }
    async updateParent(id,data) {
        return (
            await this.api.put(`/parent/children/${id}`, data) ).data;
       
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new accountService();
