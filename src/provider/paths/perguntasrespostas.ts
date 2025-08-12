import { providerpath } from "../core/typing"

const perguntasrespostas: providerpath = {
  home: {
    method: "get",
    url: "/pergunta-resposta?limite={:limite}&pagina={:pagina}"
  }
}

export default perguntasrespostas
