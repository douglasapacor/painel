import { providerpath } from "../core/typing"

const opniao: providerpath = {
  home: {
    method: "get",
    url: "/opniao?limite={:limite}&pagina={:pagina}"
  }
}

export default opniao
