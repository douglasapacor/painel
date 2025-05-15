import { locationIcon, pageMode } from "./geral"

export type component = {
  id: number
  name: string
  deviceId: string
  createdName: string
  createdAt: Date
  updatedName: string | null
  updatedAt: Date | null
}

export type componentManagement = {
  locationIcon: locationIcon
  mode: pageMode
  component: component | null
}
