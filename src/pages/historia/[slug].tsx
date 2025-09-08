import PanelFrame from "@/components/PanelFrame"
import { serversideReponse } from "@/serverside/core/serversideResponse"
import home from "@/serverside/history/home"
import { historyManagement } from "@/serverside/history/management"
import { Grid } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useState } from "react"

export const getServerSideProps: GetServerSideProps<
  serversideReponse<{}>
> = async context => {
  return home(context)
}

const NewHistory: NextPage<serversideReponse<historyManagement>> = ({
  ...props
}) => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <PanelFrame
      dense
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Histórias do ofício"
      locals={[
        {
          href: "/",
          iconName: "home",
          text: "Home"
        },
        {
          href: props.metadata.url ?? "",
          iconName: props.metadata.icone ?? "",
          text: props.metadata.nome ?? ""
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
    >
      <Grid container spacing={2}></Grid>
    </PanelFrame>
  )
}

export default NewHistory
