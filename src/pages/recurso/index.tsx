//#region imports
import { PanelFrame } from "@/components"
import { useCtxSuperior } from "@/context/Master"
import { Add } from "@mui/icons-material"
import { Box, Fab, Paper } from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
//#endregion

// export const getServerSideProps: GetServerSideProps<
//   homeType
// > = async context => {
//   return home(context)
// }

const recursos: NextPage<any> = props => {
  const ctx = useCtxSuperior()
  const router = useRouter()
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Recursos"
      locals={[
        {
          href: "/",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/componente",
          iconName: "featured_play_list",
          text: "Recursos"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
      outsideContent={
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              router.push("/recurso/new")
            }}
          >
            <Add />
          </Fab>
        </Box>
      }
    >
      <Paper sx={{ padding: 2 }}>asdadsdad</Paper>
    </PanelFrame>
  )
}

export default recursos
