import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { serversideReponse } from "../core/serversideResponse"
import ServersideSystem from "../core/ServersideSystem"

export type historyHome = {}

const home = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<serversideReponse<historyHome>>> => {
  return { props: new ServersideSystem().empty() }
}

export default home
