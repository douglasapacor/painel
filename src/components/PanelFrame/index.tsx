import { useCtxSuperior } from "@/context/Master"
import { AccountCircle, Close, Menu } from "@mui/icons-material"
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Toolbar,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { FC, ReactNode } from "react"
import ApplicationDrawer from "../ApplicationDrawer"
import LoadingBox from "../loadingBox"
import Location from "../Location"
import UserDrawer from "../UserDrawer"
import ApplicationBar from "./ApplicationBar"

export type local = {
  text: string
  href: string
  iconName: string
}

export const PanelFrame: FC<{
  children?: ReactNode
  loading?: boolean
  locals?: local[]
  outsideContent?: ReactNode
  title?: string
  showMandatoryMessage?: boolean
  showAlert?: boolean
  closeAlert?: () => void
  alerMessage?: string
  dense?: boolean
}> = ({ ...props }) => {
  const router = useRouter()
  const masterContext = useCtxSuperior()
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <ApplicationBar position="absolute" open={masterContext.left}>
        <Toolbar
          sx={{
            pr: "24px"
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                masterContext.changeLeft()
              }}
            >
              <Menu />
            </IconButton>
          </Box>

          {/* <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setRigthDrawer(rtOpen => !rtOpen)
              }}
            >
              <Icon>notifications</Icon>
              <Icon>notifications_active</Icon>
              <Icon>notifications_paused</Icon>
            </IconButton>
          </Box> */}

          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                masterContext.changeRigth()
              }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </ApplicationBar>

      <ApplicationDrawer
        PaperProps={{
          sx: {
            background: theme => theme.palette.primary.light
          }
        }}
        variant="permanent"
        open={masterContext.left}
      >
        <Toolbar
          sx={{
            display: "inline-block",
            px: [1]
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography variant="button">menu da aplicação</Typography>
          </Box>

          <Divider />

          <List
            sx={{
              width: "100%",
              maxWidth: 360
            }}
            component="nav"
          >
            <ListItemButton
              onClick={() => {
                router.push(`/recurso`)
              }}
            >
              <ListItemIcon>
                <Icon>home</Icon>
              </ListItemIcon>
              <ListItemText primary={"Recurso"} />
            </ListItemButton>
          </List>

          {/* {props.loading ? (
            <LoadingBox />
          ) : (
            <List
              sx={{
                width: "100%",
                maxWidth: 360
              }}
              component="nav"
            >
              {masterContext.data
                ? masterContext.data.access.map((item: any, index: any) => {
                    return item.visible && item.deviceId === 1 ? (
                      <ListItemButton
                        key={`menu-left-${index}-item`}
                        onClick={() => {
                          router.push(`/painel${item.path}`)
                        }}
                      >
                        <ListItemIcon>
                          <Icon>{item.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    ) : (
                      ""
                    )
                  })
                : ""}
            </List>
          )} */}
        </Toolbar>
      </ApplicationDrawer>

      <UserDrawer
        PaperProps={{
          sx: {
            background: theme => theme.palette.primary.light
          }
        }}
        variant="permanent"
        open={masterContext.rigth}
        anchor="right"
      >
        <Toolbar
          sx={{
            display: "block",
            width: "100%",
            px: [1]
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "65px",
              display: "flex",
              alignItems: "center",
              justifyContent: "left"
            }}
          ></Box>

          {props.loading ? (
            <LoadingBox />
          ) : (
            <List>
              <ListItem>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  {/* {masterContext.data && masterContext.data.photo !== "" ? (
                    <Avatar
                      sx={{ width: 102, height: 102 }}
                      src={masterContext.data.photo}
                    />
                  ) : (
                    <Avatar sx={{ width: 102, height: 102 }} />
                  )} */}

                  <Avatar sx={{ width: 102, height: 102 }} />
                </Box>
              </ListItem>
              <ListItem>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <i>{`${
                    masterContext.usuario ? masterContext.usuario.nome : ""
                  }`}</i>
                </Box>
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Typography variant="caption">MENU DO USUÁRIO</Typography>
              </ListItem>

              {/* {masterContext.data
                ? masterContext.data.configuracoes.map(
                    (item: any, index: any) => {
                      return item.visible && item.deviceId === 2 ? (
                        <ListItemButton
                          key={`menu-left-${index}-item`}
                          onClick={() => {
                            router.push(`/painel${item.path}`)
                          }}
                        >
                          <ListItemIcon>
                            <Icon>{item.icon}</Icon>
                          </ListItemIcon>
                          <ListItemText primary={item.name} />
                        </ListItemButton>
                      ) : (
                        ""
                      )
                    }
                  )
                : ""} */}

              <Divider />

              <ListItemButton
                onClick={() => {
                  masterContext.logout()
                }}
              >
                <ListItemIcon>
                  <Icon>close</Icon>
                </ListItemIcon>
                <ListItemText primary="Logoff" />
              </ListItemButton>
            </List>
          )}
        </Toolbar>
      </UserDrawer>

      <Box
        component="main"
        sx={{
          backgroundColor: theme => theme.palette.secondary.main,
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Toolbar />
        {!props.dense ? (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Location location={props.locals} />
              </Grid>

              {props.title && (
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                  <Typography
                    variant="h4"
                    sx={{ color: theme => theme.palette.primary.light }}
                  >
                    <strong>{props.title}</strong>
                  </Typography>
                </Grid>
              )}

              {props.outsideContent && (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  {props.outsideContent}
                </Grid>
              )}

              {props.showMandatoryMessage && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography
                    variant="caption"
                    sx={{ color: theme => theme.palette.primary.light }}
                  >
                    Os campos marcados com * são de preenchimento obrigatório.
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {props.children}
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Box sx={{ width: "100%", p: 5 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Location location={props.locals} />
              </Grid>

              {props.title && (
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                  <Typography
                    variant="h4"
                    sx={{ color: theme => theme.palette.primary.light }}
                  >
                    <strong>{props.title}</strong>
                  </Typography>
                </Grid>
              )}

              {props.outsideContent && (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  {props.outsideContent}
                </Grid>
              )}

              {props.showMandatoryMessage && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography
                    variant="caption"
                    sx={{ color: theme => theme.palette.primary.light }}
                  >
                    Os campos marcados com * são de preenchimento obrigatório.
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {props.children}
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>

      <Snackbar
        open={props.showAlert}
        autoHideDuration={6000}
        onClose={() => {
          props.closeAlert && props.closeAlert()
        }}
        message={props.alerMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              props.closeAlert && props.closeAlert()
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />

      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open={props.loading || false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
