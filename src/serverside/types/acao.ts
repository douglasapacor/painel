import { locationIcon, pageMode } from "./geral"
export type action = {
  id: number
  name: string
  canonical: string
  createdName: string
  createdAt: Date
  updatedName: string | null
  updatedAt: Date | null
}
export type acaoManagement = {
  locationIcon: locationIcon
  mode: pageMode
  action: action | null
}
