import Provider from "@/provider"
import { recurso } from "@/provider/dto/recurso"
import { tipoLista } from "@/provider/dto/tipoLista"
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
  ativo: boolean | null
  tipoLista: { id: number; nome: string; tag: string }[]
}

const management = async (
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<serversideReponse<recursoManagementType>>
> => {
  try {
    const response = new ServersideSystem<recursoManagementType>()
    const provider = new Provider()

    if (context.params?.slug === "novo") {
      const tipoLista = await provider.call<tipoLista>(
        "api",
        "recurso.tipos",
        undefined,
        { limite: 10, pagina: 0 },
        {
          headers: {
            credential: context.req.cookies["inrcredential"]
          }
        }
      )

      if (tipoLista.success && tipoLista.data) {
        response.data = {
          tipoLista: tipoLista.data.list
        }
      }

      response.metadata = {
        nome: "Novo recurso",
        icone: "add",
        url: "recurso/new",
        detalhes: { criacao: null, edicao: null }
      }
    } else {
      response.metadata = {
        nome: `Editando recurso ${"nome"}`,
        icone: "edit",
        url: `recurso/${context.params?.slug}`,
        detalhes: { criacao: null, edicao: null }
      }

      const item = await provider.call<recurso>(
        "api",
        "recurso.selecionar",
        undefined,
        { id: context.params?.slug },
        {
          headers: {
            credential: context.req.cookies["inrcredential"]
          }
        }
      )

      if (item.success && item.data) {
        const tipoLista = await provider.call<tipoLista>(
          "api",
          "recurso.tipos",
          undefined,
          { limite: 10, pagina: 0 },
          {
            headers: {
              credential: context.req.cookies["inrcredential"]
            }
          }
        )

        if (!tipoLista.success || !tipoLista.data)
          throw new Error("Erro selecionar lista")

        response.data = {
          id: item.data.id,
          icone: item.data.icone,
          nome: item.data.nome,
          recurso_tipo_id: item.data.recurso_tipo_id,
          tag: item.data.tag,
          url: item.data.url,
          ativo: Boolean(item.data.ativo),
          tipoLista: tipoLista.data.list
        }

        response.detalhes(
          {
            id: item.data.criadoid,
            nome: item.data.criadonome,
            data: item.data.criadoem
          },
          {
            id: item.data.editadoid,
            nome: item.data.editadonome,
            data: item.data.editadoem
          }
        )
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
