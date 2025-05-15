import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper
} from "@mui/material"
import { NextPage } from "next"
import Image from "next/image"
import { useState } from "react"

const AutenticacaoSite: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
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
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        src="/logo_inr.svg"
                        alt="Logo inr desde 1989"
                        width={300}
                        height={120}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <InputLabel htmlFor="userInput">Usuário</InputLabel>
                    <Input
                      fullWidth
                      id="userInput"
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon>alternate_email</Icon>
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <InputLabel htmlFor="passInput">Password</InputLabel>
                    <Input
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      id="passInput"
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon>key</Icon>
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Manter Conectado"
                      />
                      <Button variant="text">Esqueci minha senha</Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button fullWidth variant="contained">
                      Entrar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              background: theme => theme.palette.primary.light,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            asdas
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AutenticacaoSite
