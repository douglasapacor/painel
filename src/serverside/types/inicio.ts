export type bannersType = {
  idbanner: number
  nome: string
  link: string
  img: string
  texto: string
}

export type destaqueLinksContent = {
  id: number
  titulo: string
  img: string
}

export type destaqueLinksType = {
  idlink: number
  tipo: string
  id: number
  ordem: number
  label: string
  content: destaqueLinksContent[]
}

export type advertisingType = {
  idpublicidade: number
  texto: string
  ordem: number
}

export type inicioServerProps = {
  banners: bannersType[]
  links: destaqueLinksType[]
  publicidade: advertisingType[]
}

const constructor = (): inicioServerProps => {
  return {
    banners: [],
    links: [],
    publicidade: []
  }
}

export { constructor }
