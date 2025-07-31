//#region imports
import { DataGrid, PanelFrame } from "@/components"
import { useCtxSuperior } from "@/context/Master"
import inicio, { boletimInicioType } from "@/serverside/boletim/inicio"
import { serversideReponse } from "@/serverside/core/serversideResponse"
import { Add, Search } from "@mui/icons-material"
import {
  Box,
  Button,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
//#endregion imports

//#region getServersideProps
export const getServerSideProps: GetServerSideProps<
  serversideReponse<boletimInicioType>
> = async context => {
  return inicio(context)
}
//#endregion getServersideProps

const home: NextPage<serversideReponse<boletimInicioType>> = props => {
  //#region states
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  //#endregion states

  //#region statics
  const router = useRouter()
  const ctx = useCtxSuperior()
  //#endregion statics

  //#region function
  //#endregion function

  return (
    <PanelFrame
      dense
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Boletim eletrônico"
      loading={loading}
      locals={[
        {
          href: "/",
          iconName: "home",
          text: "Home"
        },
        {
          href: props.metadata.url ?? "",
          iconName: props.metadata.icone ?? "",
          text: props.metadata.nome ?? ""
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
              router.push("/boletim/novo")
            }}
          >
            <Add />
          </Fab>
        </Box>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <TextField fullWidth label="Número" />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <TextField fullWidth label="Data" />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="tipoBoletim">Tipo de boletim</InputLabel>
                  <Select
                    id="tipoBoletim"
                    label="Tipo de boletim"
                    // value={recursoTipoId}
                    defaultValue={0}
                    // onChange={e => {
                    //   setRecursoTipoId(+e.target.value)
                    // }}
                  >
                    <MenuItem value={0}>Selecione</MenuItem>

                    {/* {props.data.tipoLista &&
                      props.data.tipoLista.map((recursotipo, i: any) => (
                        <MenuItem
                          key={`recurso-tipo-${i}-id-${recursotipo.id}`}
                          value={recursotipo.id}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              textAlign: "center"
                            }}
                          >
                            <span>{recursotipo.nome}</span>
                            <span style={{ fontSize: "10pt" }}>
                              [{recursotipo.tag.toUpperCase()}]
                            </span>
                          </Box>
                        </MenuItem>
                      ))} */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Button
                  variant="contained"
                  startIcon={<Search />}
                  fullWidth
                  size="large"
                >
                  Buscar
                </Button>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DataGrid
                  headers={[
                    { align: "left", text: "titulo" },
                    { align: "center", text: "Número" },
                    { align: "center", text: "Data" }
                  ]}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PanelFrame>
  )
}

export default home
