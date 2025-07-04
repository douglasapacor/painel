import { Box, Grid, Paper } from "@mui/material"
import { NextPage } from "next"
import Image from "next/image"

const RecuperarSenha: NextPage = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "absolute"
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              background: theme => theme.palette.primary.main,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Box sx={{ width: "90%" }}>
              <Paper sx={{ padding: 3 }} elevation={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box
                      sx={{
                        width: "100%",
                        padding: 1,
                        display: "flex",
                        justifyContent: "left"
                      }}
                    >
                      <Image
                        src="/logos/logo_inr.svg"
                        alt="Logo inr desde 1989"
                        width={100}
                        height={50}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Box id="AuthSideSquare"></Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RecuperarSenha
