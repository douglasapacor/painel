import { providerpath } from "../core/typing"

const jurisprudencia: providerpath = {
  home: {
    method: "get",
    url: "/jurisprudencia?limite={:limite}&pagina={:pagina}"
  }
}

export default jurisprudencia
