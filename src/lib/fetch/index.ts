import axios, { AxiosResponse } from "axios"
import { defaultResponse } from "./props"

const instance = axios.create()

const get = async <T = any>(
  url: string,
  auth?: string
): Promise<defaultResponse<T>> => {
  try {
    const responseHttpRequest: AxiosResponse<defaultResponse> =
      await instance.get(url, {
        headers: {
          Authorization: auth
        }
      })

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

const post = async <T = any>(
  url: string,
  body?: any,
  auth?: string
): Promise<defaultResponse<T>> => {
  try {
    const responseHttpRequest: AxiosResponse<defaultResponse> =
      await instance.post(url, body, {
        headers: {
          Authorization: auth
        }
      })

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

const put = async <T = any>(
  url: string,
  body?: any,
  auth?: string
): Promise<defaultResponse<T>> => {
  try {
    const responseHttpRequest: AxiosResponse<defaultResponse> =
      await instance.put(url, body, {
        headers: {
          Authorization: auth
        }
      })

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

const del = async <T = any>(
  url: string,
  auth?: string
): Promise<defaultResponse<T>> => {
  try {
    const responseHttpRequest: AxiosResponse<defaultResponse> =
      await instance.delete(url, {
        headers: {
          Authorization: auth
        }
      })

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

const fetch = {
  get,
  post,
  put,
  del
}

export default fetch
