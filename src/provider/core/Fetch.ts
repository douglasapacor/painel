import { defaultResponse } from "@/lib/fetch/props"
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

export default class Fetch {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({ baseURL: "http://localhost:3001" })
  }

  async post<T = any>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<defaultResponse<T>> {
    try {
      const responseHttpRequest: AxiosResponse<defaultResponse> =
        await this.instance.post(url, body, config)

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
      return {
        success: false,
        message: error.message
      }
    }
  }

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<defaultResponse<T>> {
    try {
      const responseHttpRequest: AxiosResponse<defaultResponse> =
        await this.instance.get(url, config)

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
      return {
        success: false,
        message: error.message
      }
    }
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<defaultResponse<T>> {
    try {
      const responseHttpRequest: AxiosResponse<defaultResponse> =
        await this.instance.delete(url, config)

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
      return {
        success: false,
        message: error.message
      }
    }
  }

  async put<T = any>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<defaultResponse<T>> {
    try {
      const responseHttpRequest: AxiosResponse<defaultResponse> =
        await this.instance.put(url, body, config)

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
      return {
        success: false,
        message: error.message
      }
    }
  }
}
