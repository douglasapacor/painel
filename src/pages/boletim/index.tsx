import { PanelFrame } from "@/components"
import { Add } from "@mui/icons-material"
import { Box, Fab } from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

const Boletim: NextPage = () => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Boletim"
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/boletim",
          iconName: "list_alt",
          text: "Boletins"
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
              router.push("/painel/boletim/management/new")
            }}
          >
            <Add />
          </Fab>
        </Box>
      }
    ></PanelFrame>
  )
}

export default Boletim
