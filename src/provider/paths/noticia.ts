import { providerpath } from "../core/typing"

const noticia: providerpath = {
  home: {
    method: "get",
    url: "/noticia?limite={:limite}&pagina={:pagina}"
  }
}

export default noticia
