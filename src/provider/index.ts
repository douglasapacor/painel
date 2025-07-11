import { AxiosRequestConfig } from "axios"
import Fetch from "./core/Fetch"
import { apiRespondeDefault } from "./core/typing"
import paths from "./entrypoints"

export default class Provider {
  private fetch: Fetch

  constructor() {
    this.fetch = new Fetch()
  }

  async call<T = any>(
    identificador: string,
    body?: any,
    config?: AxiosRequestConfig<any> | undefined,
    ...args: any[]
  ): Promise<apiRespondeDefault<T>> {
    try {
      const params = identificador.split("/")
      const entrypoint = paths[params[0]][params[1]]
      const finalPath =
        typeof entrypoint.path === "string"
          ? entrypoint.path
          : entrypoint.path(args)

      switch (entrypoint.method) {
        case "get":
          return await this.fetch.get<T>(finalPath, config)
        case "post":
          return await this.fetch.post<T>(finalPath, body, config)
        case "put":
          return await this.fetch.put<T>(finalPath, body, config)
        case "delete":
          return await this.fetch.delete<T>(finalPath, config)
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
