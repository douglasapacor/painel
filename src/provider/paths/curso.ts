import { providerpath } from "../core/typing"

const curso: providerpath = {
  home: {
    method: "get",
    url: "/curso?limite={:limite}&pagina={:pagina}"
  }
}

export default curso
