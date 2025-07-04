import { PanelFrame } from "@/components"
import { Add } from "@mui/icons-material"
import { Box, Fab, Grid, Paper } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"

const ScheduleHome = () => {
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
              router.push("/painel")
            }}
          >
            <Add />
          </Fab>
        </Box>
      }
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
          <Paper
            elevation={2}
            sx={{
              width: "100%",
              height: "130px",
              background: "#1565C0",
              p: 1,
              color: "white"
            }}
          >
            <Box>asdadd sad adadad asdasdadasd</Box>
          </Paper>
        </Grid>
      </Grid>
    </PanelFrame>
  )
}

export default ScheduleHome
