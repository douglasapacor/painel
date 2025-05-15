import legacy from "@/config/actions/legacy"
import fetchApi from "@/lib/fetch"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { atoAnteriorServerProps, construtor } from "./types/atoAnterior"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<atoAnteriorServerProps>> => {
  try {
    const content = construtor()

    content.ano = context.params && context.params.ano ? +context.params.ano : 0
    content.ato = context.params && context.params.id ? +context.params.id : 0

    const list = await fetchApi.get(
      legacy.classificadores.selectPreviousBarActs(content.ato)
    )

    if (!list.success) throw new Error()

    content.list = list.data

    return {
      props: content
    }
  } catch (error: any) {
    return {
      props: construtor()
    }
  }
}

export { serverSide }
