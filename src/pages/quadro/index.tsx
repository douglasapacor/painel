import PanelFrame from "@/components/PanelFrame"
import { Search } from "@mui/icons-material"
import { Grid, InputAdornment, Paper, TextField } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"

const Quadros: NextPage<any> = props => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Quadros"
      locals={[
        {
          href: "/",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/quadros",
          iconName: "dashboard",
          text: "quadros"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            fullWidth
            placeholder="digite algo para começar"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Paper sx={{ background: "#00695C", height: "120px", width: "100%" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                nome
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                propriedades
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PanelFrame>
  )
}

export default Quadros
