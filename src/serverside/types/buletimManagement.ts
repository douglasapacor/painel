type sectionListType = {
  id: number
  name: string
  color: string
}

export type sectionType = {
  id?: number
  sectionId: number
  nome: string
  color: string
  itens: sectionItens[]
}

export type sectionItens = {
  id: number
  title: string
  link: string
  position: number
}

export type buletimType = {
  id: number | null
  boletimType: "be" | "ieptb" | "classificadores"
  boletimNumber: number | null
  section: sectionType[]
  createdName: string | null
  createdAt: Date | null
  updatedName: string | null
  updatedAt: Date | null
}

export type boletimManagement = {
  sectionsList: sectionListType[]
  buletim: buletimType
}

const constructor = (): boletimManagement => {
  return {
    sectionsList: [],
    buletim: {
      id: null,
      boletimType: "be",
      boletimNumber: null,
      section: [],
      createdName: null,
      createdAt: null,
      updatedName: null,
      updatedAt: null
    }
  }
}

export { constructor }
