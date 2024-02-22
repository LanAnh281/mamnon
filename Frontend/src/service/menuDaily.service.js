import createApiClient from "./api.service";

class accountService {
  constructor(baseUrl = "/api/login") {
    this.api = createApiClient(baseUrl);
  }
  async login() {
    return (await this.api.post("/")).data;
  }

}

export default new accountService();
