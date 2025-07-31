import { AxiosRequestConfig } from "axios"
import FetchSystem from "./core/FetchSystem"
import { apiResponseWrap } from "./core/typing"
import UnauthorizedError from "./core/UnauthorizedError"
import * as paths from "./paths"

export default class Provider {
  private fetch: FetchSystem

  constructor() {
    this.fetch = new FetchSystem()
  }

  private buildstring(url: string, params?: any): string {
    if (!params) return url

    const keys = Object.keys(params)

    let workSpace = url

    for (let i = 0; i < keys.length; i++) {
      const toSearch = `{:${keys[i]}}`

      if (workSpace.includes(toSearch)) {
        workSpace = workSpace.replace(toSearch, params[keys[i]])
      }
    }

    return workSpace
  }

  public async call<T = any>(
    server: keyof typeof this.fetch.instance,
    identifier: string,
    body?: any,
    params?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<apiResponseWrap<T>> {
    try {
      const splited = identifier.split(".")
      const first = splited[0]
      const second = splited[1]
      const path =
        paths[first as keyof typeof paths][second as keyof typeof paths]

      switch (path.method) {
        case "get": {
          return await this.fetch.get<T>(
            server,
            this.buildstring(path.url, params),
            config
          )
        }

        case "post": {
          return await this.fetch.post<T>(
            server,
            this.buildstring(path.url, params),
            body,
            config
          )
        }

        case "put": {
          return await this.fetch.put<T>(
            server,
            this.buildstring(path.url, params),
            body,
            config
          )
        }

        case "delete": {
          return await this.fetch.delete<T>(
            server,
            this.buildstring(path.url, params),
            config
          )
        }
      }
    } catch (error: any) {
      if (error instanceof UnauthorizedError) {
        window.location.href = "/autenticacao"
        throw new Error(error.message)
      } else {
        return {
          success: false,
          message: error.message
        }
      }
    }
  }
}
