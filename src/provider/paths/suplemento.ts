import { providerpath } from "../core/typing"

const suplementos: providerpath = {
  home: {
    method: "get",
    url: "/suplemento?limite={:limite}&pagina={:pagina}"
  }
}

export default suplementos
