import BaseService from "./base"

/**
 * User Service
 * @extends BaseService
 */
export default class UserService extends BaseService {
  constructor() {
    super("users")
  }

  async registerUser(payload) {
    return await this.request("", payload, "POST")
  }
}