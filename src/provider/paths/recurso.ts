import { providerpath } from "../core/typing"

const recurso: providerpath = {
  salvar: {
    method: "post",
    url: "/recurso/salvar"
  },
  selecionar: {
    method: "get",
    url: `/recurso/{:id}`
  },
  excluir: {
    method: "delete",
    url: "/recurso/{:id}/excluir"
  },
  list: {
    method: "post",
    url: "/recurso"
  },
  tipos: {
    method: "get",
    url: "/recurso/tipo?limite={:limite}&pagina={:pagina}"
  }
}

export default recurso
