export type atosAnterioresServerProps = {
  description: string
  atos: {
    idato: number
    tipo: string
    ano: number
  }[]
}

const construtor = (): atosAnterioresServerProps => {
  return {
    description: "",
    atos: []
  }
}

export { construtor }
