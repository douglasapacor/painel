import Provider from "@/provider"
import { recursolista } from "@/provider/dto/recursoLista"
import { tipoLista } from "@/provider/dto/tipoLista"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { serversideReponse } from "../core/serversideResponse"
import ServersideSystem from "../core/ServersideSystem"

export type recursoHomeType = {
  tipoLista: { id: number; nome: string; tag: string }[]
  list: {
    id: number
    nome: string
    url: string
    tag: string
    recurso_tipo_id: number
    recurso_tipo_nome: string
    ativo: boolean
  }[]
  count: number | null
}

const home = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<serversideReponse<recursoHomeType>>> => {
  try {
    const response = new ServersideSystem<recursoHomeType>()
    const provider = new Provider()

    const tipoLista = await provider.call<tipoLista>(
      "api",
      "recurso.tipos",
      undefined,
      { limite: 30, pagina: 0 },
      {
        headers: {
          credential: context.req.cookies["credential"]
        }
      }
    )

    const apiData = await provider.call<recursolista>(
      "api",
      "recurso.list",
      {
        recurso_tipo_id: 1,
        search: "",
        ativo: true,
        limite: 5,
        pagina: 0
      },
      undefined,
      {
        headers: {
          credential: context.req.cookies["credential"]
        }
      }
    )

    response.metadata = {
      icone: "featured_play_list",
      nome: "Recursos",
      url: "/recurso",
      detalhes: { criacao: null, edicao: null }
    }

    if (!tipoLista.success || !tipoLista.data)
      throw new Error("Erro selecionar lista")

    if (apiData && apiData.success && apiData.data) {
      response.data = {
        tipoLista: tipoLista.data.list,
        list: apiData.data.list,
        count: apiData.data.count
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

export default home
