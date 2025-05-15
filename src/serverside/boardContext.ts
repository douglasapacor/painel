import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { boardContext, constructor } from "./types/boardContext"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<boardContext>> => {
  try {
    const response = constructor()

    response.boardName = "task do doido"

    response.participants = [
      { id: 1, nome: "Douglas", photo: "" },
      { id: 2, nome: "Mariana", photo: "" }
    ]

    response.columns = [
      {
        id: 1,
        name: "backlog",
        cards: [
          {
            id: 1,
            name: "card 1"
          }
        ]
      },
      {
        id: 2,
        name: "fazendo",
        cards: [
          {
            id: 2,
            name: "card 1"
          },
          {
            id: 3,
            name: "card 2"
          }
        ]
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
