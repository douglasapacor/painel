import { useContextMaster } from "@/context/Master"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography
} from "@mui/material"
import Image from "next/image"
import { useState, type FC } from "react"

export const Topo: FC = () => {
  const [loginDialog, setLoginDialog] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const ctx = useContextMaster()
  const handleClickOpen = () => {
    setLoginDialog(true)
  }
  const handleClose = () => {
    setLoginDialog(false)
  }
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
    <div
      style={{
        width: "100%",
        height: 100
      }}
    >
      <Container>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <Box
              sx={{
                width: "100%",
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <a href="/site/inicio">
                <Image
                  src="/logos/logo_inr.svg"
                  width="161"
                  height="81"
                  alt="INR Logo"
                />
              </a>
            </Box>
          </Grid>

          {ctx.user ? (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <Box
                sx={{
                  width: "100%",
                  height: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Grid container>
                  <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                            p: 0.7
                          }}
                        >
                          <Typography variant="body2">
                            <strong>Nome do usuário</strong>
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            p: 0.7
                          }}
                        >
                          <IconButton>
                            <Badge badgeContent={5} color="primary">
                              <Icon>notifications</Icon>
                            </Badge>
                          </IconButton>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            p: 0.7
                          }}
                        >
                          <IconButton>
                            <Icon>person</Icon>
                          </IconButton>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            p: 0.7
                          }}
                        >
                          <IconButton>
                            <Icon>settings</Icon>
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                      }}
                    >
                      <Box sx={{ marginBottom: 0.7 }}>
                        <Avatar>H</Avatar>
                      </Box>

                      <Button size="small">sair</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                <IconButton color="secondary" onClick={handleClickOpen}>
                  <Icon>key</Icon>
                </IconButton>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
      <Dialog fullWidth open={loginDialog} onClose={handleClose} maxWidth="xs">
        <DialogContent>
          <Box sx={{ width: "100%" }}>
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
                    width={160}
                    height={70}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    width: "100%",
                    padding: 1,
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Typography variant="body1">LOGIN DE USUÁRIO</Typography>
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
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}
