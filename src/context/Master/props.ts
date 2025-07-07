export type contextoUsuario = {
  nome: string
  idgrupo: number
  idacesso: number
  nivel_consultor: number
  consultoria: number
  data_ultimo_acesso: string
  credential: string
  configuracoes: Record<string, { nome: string; icone: string; url: string }[]>
}

export type contextoPadrao = {
  usuario: contextoUsuario | null
  isAuth: boolean
  left: boolean
  rigth: boolean
  login: (ctx: {
    nome: string
    idgrupo: number
    idacesso: number
    nivel_consultor: number
    consultoria: number
    data_ultimo_acesso: string
    credential: string
    configuracoes: Record<
      string,
      { nome: string; icone: string; url: string }[]
    >
  }) => void
  logout: () => void
  changeLeft: () => void
  changeRigth: () => void
}

export const contextoSuperior: contextoPadrao = {
  usuario: {
    nome: "",
    idgrupo: 0,
    idacesso: 0,
    nivel_consultor: 0,
    consultoria: 0,
    data_ultimo_acesso: "",
    credential: "",
    configuracoes: {}
  },
  isAuth: false,
  left: false,
  rigth: false,
  login: (ctx: contextoUsuario) => {},
  logout: () => {},
  changeLeft: () => {},
  changeRigth: () => {}
}
