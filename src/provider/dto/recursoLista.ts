export type recursolista = {
  list: {
    id: number
    nome: string
    url: string
    tag: string
    recurso_tipo_id: number
    recurso_tipo_nome: string
    ativo: boolean
  }[]
  count: number
}
