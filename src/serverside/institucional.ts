import legacy from "@/config/actions/legacy"
import fetchApi from "@/lib/fetch"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { constructor, institucionalType } from "./types/institucional"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<institucionalType>> => {
  try {
    const response = constructor()
    const desc = await fetchApi.get(legacy.boletim.description(1))
    const curriculum = await fetchApi.get(legacy.home.curriculum)

    response.description = desc.data
    response.curriculums = curriculum.data

    return {
      props: response
    }
  } catch (error: any) {
    return {
      props: constructor()
    }
  }
}

export { serverSide }
