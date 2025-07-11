import { entrypointType } from "./core/typing"

const paths: entrypointType = {
  seguranca: {
    autenticacao: {
      method: "post",
      path: `/seguranca/autenticacao/painel`
    }
  },
  recurso: {
    salvar: {
      method: "post",
      path: "/recurso/salvar"
    },
    selecionar: {
      method: "get",
      path: (id: number) => `/recurso/${id}`
    },
    excluir: {
      method: "delete",
      path: (id: number) => `/recurso/${id}/excluir`
    },
    list: {
      method: "post",
      path: `/recurso`
    },
    tipos: {
      method: "get",
      path: (limite: number, pagina: number) =>
        `/recurso/tipo?limite=${limite}&pagina=${pagina}`
    }
  }
}

export default paths
