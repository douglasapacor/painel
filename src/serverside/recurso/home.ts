import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { serversideReponse } from "../core/serversideResponse"
import ServersideSystem from "../core/ServersideSystem"

export type recursoHomeType = {}

const home = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<serversideReponse<recursoHomeType>>> => {
  try {
    const response = new ServersideSystem()

    return {
      props: response.json()
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/recurso?err=2",
        permanent: true
      }
    }
  }
}

export default home
