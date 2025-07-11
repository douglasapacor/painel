import { metadata } from "./metadata"

export type serversideReponse<T = any> = {
  metadata: metadata
  data: Partial<T>
}
