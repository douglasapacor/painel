import Provider from "@/provider"
import UnauthorizedError from "@/provider/core/UnauthorizedError"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { serversideReponse } from "../core/serversideResponse"
import ServersideSystem from "../core/ServersideSystem"

export type boletimManagementType = {
  id?: number
  titulo: string
  numero: number
  boletim_tipo_id: number | null
  boletim_tipo_nome: string
  data: string
  ativo: number
  favorito: number
  vizualizacao: number
  observacao: string
  criado_id: number
  criado_em: Date
  criado_nome: string
  alterado_id: number
  alterado_em: Date
  alterado_nome: string
  aprovado_id: number
  aprovado_em: Date
  aprovado_nome: string
  aprovado: string
  publicado_id: number
  publicado_em: Date
  publicado_nome: string
  publicado: string
  tipoLista: { id: number; nome: string }[]
  conteudotipoLista: { id: number; nome: string }[]
  boletimTipoDisabled: boolean
  boletimDataDisabled: boolean
  needSaveBe: boolean
  needSaveContent: boolean
  needSaveObservacao: boolean
  conteudo: {
    conteudo_tipo_id: number
    items: {
      id: number | null
      identificador: number
      titulo: string
      url: string
    }[]
  }[]
}

const management = async (
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<serversideReponse<boletimManagementType>>
> => {
  try {
    const response = new ServersideSystem<boletimManagementType>()
    const provider = new Provider()

    if (context.params?.slug === "novo") {
      response.metadata = {
        url: "/boletim/novo",
        nome: "Novo boletim eletrônico",
        icone: "add",
        detalhes: {
          criacao: null,
          edicao: null
        }
      }

      const tipoLista = await provider.call<{ id: number; nome: string }[]>(
        "api",
        "boletim.tipo",
        undefined,
        undefined,
        {
          headers: {
            credential: context.req.cookies["credential"]
          }
        }
      )

      response.data = {
        boletim_tipo_id: null,
        data: new Date().toString(),
        tipoLista: tipoLista.data || [],
        conteudotipoLista: [],
        boletimTipoDisabled: false,
        boletimDataDisabled: false,
        needSaveBe: true,
        needSaveContent: true,
        needSaveObservacao: true
      }
    } else {
      const boletimSelecionado = await provider.call<{
        id: number
        titulo: string
        numero: number
        boletim_tipo_id: number
        boletim_tipo_nome: string
        data: string
        ativo: number
        favorito: number
        vizualizacao: number
        observacao: string
        criado_id: number
        criado_em: Date
        criado_nome: string
        alterado_id: number
        alterado_em: Date
        alterado_nome: string
        aprovado_id: number
        aprovado_em: Date
        aprovado_nome: string
        aprovado: string
        publicado_id: number
        publicado_em: Date
        publicado_nome: string
        publicado: string
        conteudo: {
          conteudo_tipo_id: number
          items: {
            id: number
            identificador: number
            titulo: string
            url: string
          }[]
        }[]
      }>(
        "api",
        "boletim.selecionar",
        undefined,
        { id: context.params?.slug },
        {
          headers: {
            credential: context.req.cookies["credential"]
          }
        }
      )

      const tipolista = await provider.call<{ id: number; nome: string }[]>(
        "api",
        "boletim.tipo",
        undefined,
        undefined,
        {
          headers: {
            credential: context.req.cookies["credential"]
          }
        }
      )

      const conttipolista = await provider.call<{ id: number; nome: string }[]>(
        "api",
        "boletim.conteudotipo",
        undefined,
        { idtipoboletim: boletimSelecionado.data?.boletim_tipo_id },
        {
          headers: {
            credential: context.req.cookies["credential"]
          }
        }
      )

      response.metadata = {
        url: `/boletim/${context.params?.slug}`,
        nome: "Visualizando boletim",
        icone: "visibility",
        detalhes: {
          criacao: {
            id: boletimSelecionado.data?.criado_id || null,
            nome: boletimSelecionado.data?.criado_nome || "",
            data: boletimSelecionado.data?.criado_em || ""
          },
          edicao: {
            id: boletimSelecionado.data?.alterado_id || null,
            nome: boletimSelecionado.data?.alterado_nome || "",
            data: boletimSelecionado.data?.alterado_em || ""
          }
        }
      }

      response.data = {
        ...boletimSelecionado.data,
        tipoLista: tipolista.success && tipolista.data ? tipolista.data : [],
        conteudotipoLista:
          conttipolista.success && conttipolista.data ? conttipolista.data : [],
        boletimTipoDisabled: true,
        boletimDataDisabled: true,
        needSaveBe: false,
        needSaveContent: false,
        needSaveObservacao: false
      }
    }

    return {
      props: response.json()
    }
  } catch (error: any) {
    if (error instanceof UnauthorizedError) {
      return {
        redirect: {
          destination: "/autenticacao",
          statusCode: 301
        }
      }
    } else {
      return {
        props: new ServersideSystem().empty()
      }
    }
  }
}

export default management
