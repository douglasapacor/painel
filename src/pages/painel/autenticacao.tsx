import security from "@/config/actions/security"
import { useContextMaster } from "@/context/Master"
import fetchApi from "@/lib/fetch"
import { Close, Visibility, VisibilityOff } from "@mui/icons-material"
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
  Paper,
  Snackbar
} from "@mui/material"
import type { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

const AutenticacaoPainel: NextPage = () => {
  const [user, setUser] = useState<string>("")
  const [userError, setUserError] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [keepConnected, setKeepConnected] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>("")
  const [lock, setLock] = useState<boolean>(false)
  const router = useRouter()
  const masterContext = useContextMaster()
  const closeAlert = () => setAlert(false)

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

  const goToRecoveryPassword = () => {
    router.push("/painel/recuperar-senha")
  }

  const autehticationUser = async () => {
    try {
      if (user === "") {
        setUserError(true)

        setTimeout(() => {
          setUserError(false)
        }, 3000)

        throw new Error("Preencha o campo usuário.")
      }

      if (password === "") {
        setPasswordError(true)

        setTimeout(() => {
          setPasswordError(false)
        }, 3000)

        throw new Error("Preencha o campo senha.")
      }

      setLock(true)

      const result = await fetchApi.post(security.user.authentication, {
        login: user,
        password: password,
        keepConnected: keepConnected
      })

      if (!result.success) throw new Error(result.message)

      masterContext.login(result.data)

      router.push("/painel/inicio")
    } catch (error: any) {
      setLock(false)
      setAlertMessage(error.message)
      setAlert(true)
    }
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
                        src="/logos/logo_inr.svg"
                        alt="Logo inr desde 1989"
                        width={120}
                        height={60}
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
                      error={userError}
                      onChange={event => {
                        setUser(event.target.value)
                      }}
                      disabled={lock}
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
                      error={passwordError}
                      onChange={event => {
                        setPassword(event.target.value)
                      }}
                      disabled={lock}
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
                        control={
                          <Checkbox
                            checked={keepConnected}
                            disabled={lock}
                            onChange={event => {
                              setKeepConnected(event.target.checked)
                            }}
                          />
                        }
                        label="Manter Conectado"
                      />
                      <Button
                        disabled={lock}
                        variant="text"
                        onClick={goToRecoveryPassword}
                      >
                        Esqueci minha senha
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={autehticationUser}
                      disabled={lock}
                    >
                      Entrar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Box id="AuthSideSquare">
            <Image
              src="/logos/logo_inr_branco.svg"
              alt="Logo inr desde 1989"
              width={500}
              height={320}
            />
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={() => {
          closeAlert()
        }}
        message={alertMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              closeAlert()
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  )
}

export default AutenticacaoPainel
