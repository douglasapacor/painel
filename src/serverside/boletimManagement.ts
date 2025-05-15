import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { boletimManagement, constructor } from "./types/buletimManagement"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<boletimManagement>> => {
  try {
    const response = constructor()

    response.sectionsList = [
      {
        id: 1,
        name: "Notícias",
        color: "#3F51B5"
      },
      {
        id: 2,
        name: "Jurisprudencia",
        color: "#2196F3"
      },
      {
        id: 3,
        name: "Legislação",
        color: "#03A9F4"
      },
      {
        id: 4,
        name: "Opnião",
        color: "#00BCD4"
      },
      {
        id: 5,
        name: "Perguntas e respostas",
        color: "#009688"
      },
      {
        id: 6,
        name: "Mensagens dos editores",
        color: "#4CAF50"
      },
      {
        id: 7,
        name: "Pareceres CGJ SP",
        color: "#8BC34A"
      },
      {
        id: 8,
        name: "Suplementos da consultoria INR",
        color: "#CDDC39"
      },
      {
        id: 9,
        name: "Histórias do ofício",
        color: "#FFEB3B"
      }
    ]

    return {
      props: response
    }
  } catch (error) {
    return {
      props: constructor()
    }
  }
}

export { serverSide }
