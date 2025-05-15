import { PanelFrame } from "@/components"
import { NextPage } from "next"

const home: NextPage = () => {
  return (
    <PanelFrame dense requiredPath="/inicio">
      {/* <Grid container spacing={5}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <Paper sx={{ width: "100%", padding: 2 }}>
            Classificadores: 11100
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <Paper sx={{ width: "100%", padding: 2 }}>Boletins: 11100</Paper>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <Paper sx={{ width: "100%", padding: 2 }}>IEPTB: 11100</Paper>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <Paper sx={{ width: "100%", padding: 2 }}>Clientes: 11100</Paper>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <Paper sx={{ width: "100%", padding: 2 }}>Tasks: 11100</Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ width: "100%", padding: 2 }}>
            Mensagens ao usuários
          </Paper>
        </Grid>
      </Grid> */}
    </PanelFrame>
  )
}

export default home
