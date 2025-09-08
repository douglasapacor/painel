import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { serversideReponse } from "../core/serversideResponse"
import ServersideSystem from "../core/ServersideSystem"

export type historyManagement = {}

const Management = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<serversideReponse<historyManagement>>> => {
  return { props: new ServersideSystem().empty() }
}

export default Management
