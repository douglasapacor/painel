import { providerpath } from "../core/typing"

const pareceresCGJSP: providerpath = {
  home: {
    method: "get",
    url: "/parecer?limite={:limite}&pagina={:pagina}"
  }
}

export default pareceresCGJSP
