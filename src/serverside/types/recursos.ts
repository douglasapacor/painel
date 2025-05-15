import { locationIcon, pageMode } from "./geral"
export type actionFeatures = {
  id: number
  name: string
  canonical: string
  checked: boolean
}
export type feature = {
  id: number | null
  name: string | null
  canonical: string | null
  actions: actionFeatures[]
  active: boolean
  visible: boolean
  deviceComponentsId: number
  icon: string | null
  path: string | null
  createdName: string | null
  createdAt: Date | null
  updatedName: string | null
  updatedAt: Date | null
}
export type deviceList = { id: number; name: string; deviceid: number }
export type featureManagement = {
  locationIcon: locationIcon
  pageMode: pageMode
  device: {
    list: deviceList[]
    length: number
  }
  feature: feature
}
const construtor = () => {
  let res: featureManagement = {
    locationIcon: "visibility",
    pageMode: "visualizing",
    device: {
      list: [],
      length: 0
    },
    feature: {
      id: null,
      name: null,
      canonical: null,
      actions: [],
      active: false,
      visible: false,
      deviceComponentsId: 0,
      icon: null,
      path: null,
      createdName: null,
      createdAt: null,
      updatedName: null,
      updatedAt: null
    }
  }
  return res
}

export { construtor }
