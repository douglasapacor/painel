import { providerpath } from "../core/typing"

const legislacao: providerpath = {
  home: {
    method: "get",
    url: "/legislacao?limite={:limite}&pagina={:pagina}"
  }
}

export default legislacao
