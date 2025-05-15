export type ctxAccess = {
  name: string
  icon: string
  path: string
  visible: boolean
  deviceId: number
}

export type ctxGroup = {
  name: string
  canonical: string
}

export type ctxUser = {
  name: string
  email: string
  cellphone: string
  photo: string
  group: ctxGroup
  credential: string
  access: ctxAccess[]
}

export type defaultCtx = {
  data: ctxUser | null
  left: boolean
  rigth: boolean
  login: (ctx: {
    name: string
    email: string
    cellphone: string
    photo: string
    group: ctxGroup
    credential: string
    access: ctxAccess[]
  }) => void
  logout: () => void
  changeLeft: () => void
  changeRigth: () => void
}

export const masterCtxDefault: defaultCtx = {
  data: {
    name: "",
    email: "",
    cellphone: "",
    photo: "",
    group: {
      name: "",
      canonical: ""
    },
    credential: "",
    access: []
  },
  left: false,
  rigth: false,
  login: (ctx: ctxUser) => {},
  logout: () => {},
  changeLeft: () => {},
  changeRigth: () => {}
}
