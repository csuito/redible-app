import { create } from "apisauce"

/**
 * Base service
 */
export default class BaseService {
  constructor(serviceName) {
    this.baseUrl = `https://cryptic-tundra-25786.herokuapp.com/${serviceName}`
    this.api = create({
      baseURL: this.baseUrl
    })
  }

  async request(url = "", body = {}, method = "GET", headers = {}) {
    let response

    try {
      this.api.setHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...headers
      })

      switch (method) {
        case "POST":
          response = await this.api.post(url, body, method)
          break
        case "PUT":
          response = await this.api.put(url, body, method)
          break
        case "DELETE":
          response = await this.api.delete(url, body, method)
          break
        default:
          response = await this.api.get(url)
      }

      console.log("RESPONSE @BASE", response)

      return response
    } catch (err) {
      console.log(err)
    }
  }
}