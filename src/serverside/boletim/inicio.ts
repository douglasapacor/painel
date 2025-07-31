import Provider from "@/provider"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { serversideReponse } from "../core/serversideResponse"
import ServersideSystem from "../core/ServersideSystem"

export type boletimInicioType = {}

const inicio = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<serversideReponse<boletimInicioType>>> => {
  try {
    const response = new ServersideSystem<boletimInicioType>()
    const provider = new Provider()

    response.metadata = {
      url: "/boletim",
      nome: "Boletim eletrônico",
      icone: "newspaper",
      detalhes: {
        criacao: null,
        edicao: null
      }
    }
    return {
      props: response.json()
    }
  } catch (error: any) {
    return {
      props: new ServersideSystem().empty()
    }
  }
}

export default inicio
