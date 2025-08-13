import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios"
import { apiResponseWrap } from "./typing"
import UnauthorizedError from "./UnauthorizedError"

export default class FetchSystem {
  public instance: { api: AxiosInstance }
  private url: string

  constructor() {
    this.url =
      process.env.NODE_ENV === "production"
        ? "https://api.publicacoesinr.com.br"
        : "http://localhost:3001"

    this.instance = {
      api: axios.create({ baseURL: this.url })
    }
  }

  async post<T = any>(
    server: keyof typeof this.instance,
    url: string,
    body?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<apiResponseWrap<T>> {
    try {
      const responseHttpRequest: AxiosResponse<apiResponseWrap<T>> =
        await this.instance[server].post(url, body, config)

      if (responseHttpRequest.status === 200) {
        if (responseHttpRequest.data.data) {
          return {
            success: responseHttpRequest.data.success,
            data: responseHttpRequest.data.data,
            message: responseHttpRequest.data.message
          }
        } else {
          return {
            success: responseHttpRequest.data.success,
            message: responseHttpRequest.data.message
          }
        }
      } else {
        return {
          success: false,
          message: responseHttpRequest.data.message
        }
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        window.location.href = "/autenticacao"

        localStorage.removeItem("contextosuperior")
        localStorage.removeItem("leftDrawerOpen")
        localStorage.removeItem("rightDrawerOpen")

        return {
          success: false,
          message: error.message
        }
      } else {
        return {
          success: false,
          message: error.message
        }
      }
    }
  }

  async get<T = any>(
    server: keyof typeof this.instance,
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<apiResponseWrap<T>> {
    try {
      const responseHttpRequest: AxiosResponse<apiResponseWrap<T>> =
        await this.instance[server].get(url, config)

      if (responseHttpRequest.status === 200) {
        if (responseHttpRequest.data.data) {
          return {
            success: responseHttpRequest.data.success,
            data: responseHttpRequest.data.data,
            message: responseHttpRequest.data.message
          }
        } else {
          return {
            success: responseHttpRequest.data.success,
            message: responseHttpRequest.data.message
          }
        }
      } else if (responseHttpRequest.status === 400) {
        throw new UnauthorizedError(
          responseHttpRequest.data.message?.toString() || ""
        )
      } else {
        return {
          success: false,
          message: responseHttpRequest.data.message
        }
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        window.location.href = "/autenticacao"

        localStorage.removeItem("contextosuperior")
        localStorage.removeItem("leftDrawerOpen")
        localStorage.removeItem("rightDrawerOpen")

        return {
          success: false,
          message: error.message
        }
      } else {
        return {
          success: false,
          message: error.message
        }
      }
    }
  }

  async delete<T = any>(
    server: keyof typeof this.instance,
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<apiResponseWrap<T>> {
    try {
      const responseHttpRequest: AxiosResponse<apiResponseWrap<T>> =
        await this.instance[server].delete(url, config)

      if (responseHttpRequest.status === 200) {
        if (responseHttpRequest.data.data) {
          return {
            success: responseHttpRequest.data.success,
            data: responseHttpRequest.data.data,
            message: responseHttpRequest.data.message
          }
        } else {
          return {
            success: responseHttpRequest.data.success,
            message: responseHttpRequest.data.message
          }
        }
      } else {
        return {
          success: false,
          message: responseHttpRequest.data.message
        }
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        window.location.href = "/autenticacao"

        localStorage.removeItem("contextosuperior")
        localStorage.removeItem("leftDrawerOpen")
        localStorage.removeItem("rightDrawerOpen")

        return {
          success: false,
          message: error.message
        }
      } else {
        return {
          success: false,
          message: error.message
        }
      }
    }
  }

  async put<T = any>(
    server: keyof typeof this.instance,
    url: string,
    body?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<apiResponseWrap<T>> {
    try {
      const responseHttpRequest: AxiosResponse<apiResponseWrap<T>> =
        await this.instance[server].put(url, body, config)

      if (responseHttpRequest.status === 200) {
        if (responseHttpRequest.data.data) {
          return {
            success: responseHttpRequest.data.success,
            data: responseHttpRequest.data.data,
            message: responseHttpRequest.data.message
          }
        } else {
          return {
            success: responseHttpRequest.data.success,
            message: responseHttpRequest.data.message
          }
        }
      } else {
        return {
          success: false,
          data: responseHttpRequest.data.data
        }
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        window.location.href = "/autenticacao"

        localStorage.removeItem("contextosuperior")
        localStorage.removeItem("leftDrawerOpen")
        localStorage.removeItem("rightDrawerOpen")

        return {
          success: false,
          message: error.message
        }
      } else {
        return {
          success: false,
          message: error.message
        }
      }
    }
  }
}
