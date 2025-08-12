import { providerpath } from "../core/typing"

const historia: providerpath = {
  home: {
    method: "get",
    url: "/historia?limite={:limite}&pagina={:pagina}"
  }
}

export default historia
