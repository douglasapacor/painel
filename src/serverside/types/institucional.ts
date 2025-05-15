export type institucionalType = {
  description: string | null
  curriculums: { id: number; nome: string; img: string; conteudo: string }[]
}

export const constructor = (): institucionalType => {
  return {
    description: null,
    curriculums: []
  }
}
