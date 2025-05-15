import { NextPage } from "next"
import { useRouter } from "next/router"

const BeReader: NextPage = props => {
  const router = useRouter()
  return <>{JSON.stringify(router.query)}</>
}

export default BeReader
