import addresses from "./addresses"

export default {
  seguranca: {
    panelLogin: `${addresses.api}/seguranca/autenticacao/painel`
  },
  recurso: {
    salvar: `${addresses.api}/recurso/salvar`,
    selecionar: (id: number) => `${addresses.api}/recurso/${id}`,
    excluir: (id: number) => `${addresses.api}/recurso/${id}/excluir`,
    list: `${addresses.api}/recurso`
  }
}
