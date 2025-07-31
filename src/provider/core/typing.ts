export type apiResponseWrap<T = any> = {
  success: boolean
  data?: T
  message?: string | string[]
}

export type providerpath = Record<
  string,
  { url: string; method: "post" | "get" | "put" | "delete" }
>
