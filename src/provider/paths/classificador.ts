import { providerpath } from "../core/typing"

const classificador: providerpath = {
  sp: {
    method: "get",
    url: "/classificador?id=1&limit={:limite}&page={:pagina}"
  },
  pr: {
    method: "get",
    url: "/classificador?id=3&limit={:limite}&page={:pagina}"
  },
  rs: {
    method: "get",
    url: "/classificador?id=2&limit={:limite}&page={:pagina}"
  }
}

export default classificador
