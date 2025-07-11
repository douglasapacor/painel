import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { serversideReponse } from "../core/serversideResponse"
import ServersideSystem from "../core/ServersideSystem"

export type recursoManagementType = {
  id: number | null
  nome: string | null
  recurso_tipo_id: number | null
  tag: string | null
  icone: string | null
  url: string | null
  tipoLista: { id: number; nome: string; tag: string }[]
}

const management = async (
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<serversideReponse<recursoManagementType>>
> => {
  try {
    const response = new ServersideSystem<recursoManagementType>()

    const tipoLista = await response.api.call<
      { id: number; nome: string; tag: string }[]
    >("recurso/tipos", undefined, undefined, { limite: 11, pagina: 0 })

    if (tipoLista.success && tipoLista.data) {
      response.data.tipoLista = tipoLista.data
    }

    if (context.params?.slug === "new") {
      response.metadata = {
        nome: "Novo recurso",
        icone: "add",
        url: "recurso/new",
        detalhes: { criacao: null, edicao: null }
      }
    } else {
      response.metadata = {
        nome: `Editando recurso ${"nome"}`,
        icone: "home",
        url: `recurso/${context.params?.slug}`,
        detalhes: { criacao: null, edicao: null }
      }

      response.data = {
        nome: "aaaa",
        icone: "home",
        recurso_tipo_id: 1,
        id: 1,
        tag: "asdada",
        url: "algo/algo",
        tipoLista: [{ id: 1, nome: "left", tag: "ddddd" }]
      }
    }

    return {
      props: response.json()
    }
  } catch (error: any) {
    return {
      props: new ServersideSystem<recursoManagementType>().empty()
    }
  }
}

export default management
