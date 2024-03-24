import createApiClient from "./api.service";

class notificationService {
  constructor(baseUrl = "/api/notification") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async getAllUser() {
    return (await this.api.get("/getAll/user")).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async createCustomer(data) {
    return (await this.api.post("/customer/noti", data)).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new notificationService();