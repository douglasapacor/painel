import { PanelFrame } from "@/components"
import { Grid, Paper } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"

const Schedule = () => {
  const router = useRouter()
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Calendário"
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/schedule",
          iconName: "calendar_today",
          text: "Calendário"
        },
        {
          href: "/painel/schedule/123123",
          iconName: "calendar_today",
          text: "Vizualizando calendário"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ p: 1 }}>asd</Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ p: 1 }}>asd</Paper>
        </Grid>
      </Grid>
    </PanelFrame>
  )
}

export default Schedule
