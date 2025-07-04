import { locationIcon, pageMode } from "./geral"

export type recurso = {
  id: number | null
  nome: string | null
  recurso_tipo_id: number | null
  tag: string | null
  icone: string | null
  url: string | null
  ativo: boolean
  criadopor: string | null
  criadoem: Date | null
  editadopor: string | null
  editadoem: Date | null
}
export type recursoTipo = { id: number; nome: string; tag: string }
export type featureManagement = {
  locationIcon: locationIcon
  pageMode: pageMode
  recursoTipoLista: {
    list: recursoTipo[]
    length: number
  }
  recurso: recurso
}
const construtor = () => {
  let res: featureManagement = {
    locationIcon: "visibility",
    pageMode: "visualizing",
    recursoTipoLista: {
      list: [],
      length: 0
    },
    recurso: {
      id: null,
      nome: null,
      recurso_tipo_id: null,
      tag: null,
      icone: null,
      url: null,
      ativo: false,
      criadopor: null,
      criadoem: null,
      editadopor: null,
      editadoem: null
    }
  }
  return res
}

export { construtor }
