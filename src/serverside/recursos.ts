import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { construtor, featureManagement } from "./types/recursos"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<featureManagement>> => {
  try {
    const props = construtor()

    if (!context.params) {
      return {
        redirect: { destination: "/painel/recurso", statusCode: 308 }
      }
    }

    props.pageMode =
      context.params.slug && context.params.slug[0] === "new"
        ? "creating"
        : "visualizing"

    return {
      props
    }
  } catch (error: any) {
    return {
      props: construtor()
    }
  }
}

export default serverSide
