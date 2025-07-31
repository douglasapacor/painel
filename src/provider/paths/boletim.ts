import { providerpath } from "../core/typing"

const boletim: providerpath = {
  salvar: {
    method: "post",
    url: "/boletim/novo"
  },
  tipo: {
    method: "get",
    url: "/boletim/tipo"
  },
  conteudotipo: {
    method: "get",
    url: "/boletim/conteudo/tipo?idtipoboletim={:idtipoboletim}"
  },
  selecionar: {
    method: "get",
    url: "/boletim/{:id}"
  },
  updateconteudo: {
    method: "put",
    url: "/boletim/{:idboletim}/conteudo"
  },
  getconteudo: {
    method: "get",
    url: "/boletim/{:idboletim}/conteudo"
  },
  updateobservacao: {
    method: "put",
    url: "/boletim/{:idboletim}/observacao"
  }
}

export default boletim
