type functionPath = (...args: any[]) => string

export type entrypointType = Record<
  string,
  Record<
    string,
    { method: "get" | "post" | "put" | "delete"; path: string | functionPath }
  >
>

export type apiRespondeDefault<T = any> = {
  success: boolean
  data?: T
  message?: string
}
