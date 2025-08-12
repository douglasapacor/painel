import { providerpath } from "../core/typing"

const mensagemeditores: providerpath = {
  home: {
    method: "get",
    url: "/mensagem-editor?limite={:limite}&pagina={:pagina}"
  }
}

export default mensagemeditores
