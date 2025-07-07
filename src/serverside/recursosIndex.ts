import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { constructor, featureIndexServerSide } from "./types/recursosIndex"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<featureIndexServerSide>> => {
  try {
    const response = constructor()
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
