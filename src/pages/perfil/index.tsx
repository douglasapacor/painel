import PanelFrame from "@/components/PanelFrame"
import { Box, Grid, Icon, IconButton, Paper, TextField } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"

const Perfil: NextPage = props => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
    <PanelFrame
      dense
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Perfil de usuário"
      loading={loading}
      locals={[
        {
          href: "/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/perfil",
          iconName: "protrait",
          text: "Perfil de usuário"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Box
                  sx={{
                    width: "100%",
                    minHeight: "400px",
                    height: "400px",
                    border: "4px solid #9E9E9E",
                    borderRadius: 2,
                    padding: 2,
                    backgroundImage:
                      "url(https://object.publicacoesinr.com.br/inr/no-photo.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "60%",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "end"
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      background: "rgba(43, 37, 223, 0.8)",
                      borderRadius: 1,
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignContent: "center",
                      padding: "10px"
                    }}
                  >
                    <IconButton>
                      <Icon>image_search</Icon>
                    </IconButton>

                    <IconButton>
                      <Icon>delete</Icon>
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextField fullWidth label="Nome" disabled />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PanelFrame>
  )
}

export default Perfil
