import { quem } from "./quem"

export type metadata = {
  url: string | null
  nome: string | null
  icone: string | null
  detalhes: {
    criacao: quem | null
    edicao: quem | null
  }
}
