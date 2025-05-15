export type atoAnteriorList = {
  idanexo: number
  idato: number
  barra_titulo: string
  img: string
  cor: string
  titulo: string
}

export type atoAnteriorServerProps = {
  ato: number
  ano: number
  list: atoAnteriorList[]
}

const construtor = (): atoAnteriorServerProps => {
  return {
    ato: 0,
    ano: 0,
    list: []
  }
}

export { construtor }
