import legacy from "@/config/actions/legacy"
import fetchApi from "@/lib/fetch"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { atosAnterioresServerProps, construtor } from "./types/atosAnteriores"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<atosAnterioresServerProps>> => {
  try {
    let content = construtor()

    const desc = await fetchApi.get(legacy.boletim.description(16))
    const list = await fetchApi.get(legacy.classificadores.selectPreviousActs())

    if (!list.success) throw new Error()

    content.description = desc.data ? desc.data : null
    content.atos = list.data

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
