import BaseService from "./base"

/**
 * Restaurant Service
 * @extends BaseService
 */
export default class RestaurantService extends BaseService {
  constructor() {
    super("restaurants")
  }

  async getAllRestaurants() {
    return await this.request()
  }

  async getRestaurantById(id) {
    return await this.request("/" + id)
  }
}