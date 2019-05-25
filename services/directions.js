import BaseService from "./base"

/**
 * Directions Service
 * @extends BaseService
 */
export default class DirectionsService extends BaseService {
  constructor() {
    super("directions")
  }

  async getDirections(origin, destination) {
    return await this.request(`/${origin}/${destination}`)
  }
}