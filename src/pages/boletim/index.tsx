//#region imports
import DataGrid from "@/components/DataGrid"
import PanelFrame from "@/components/PanelFrame"
import { useCtxSuperior } from "@/context/Master"
import Provider from "@/provider"
import inicio, { boletimInicioType } from "@/serverside/boletim/inicio"
import { serversideReponse } from "@/serverside/core/serversideResponse"
import { Add, Search, Visibility } from "@mui/icons-material"
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
//#endregion imports

//#region getServersideProps
export const getServerSideProps: GetServerSideProps<
  serversideReponse<boletimInicioType>
> = async context => {
  return inicio(context)
}
//#endregion getServersideProps

const BoletimHome: NextPage<serversideReponse<boletimInicioType>> = props => {
  //#region states
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [boletimTipo, setBoletimTipo] = useState<number | null>(null)
  const [tipoLista] = useState<{ id: number; nome: string }[]>(
    props.data.tipoLista || []
  )
  const [numeroBE, setNumeroBE] = useState<number | "">("")
  const [boltimData, setBoletimData] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  )
  const [listaBoletim, setListaBoletim] = useState<
    { id: number; titulo: string; numero: number; tipo: string; data: string }[]
  >([])
  const [total, setTotal] = useState(0)
  const [pagina, setPagina] = useState(0)
  const [limite, setLimite] = useState(5)
  //#endregion states

  //#region statics
  const router = useRouter()
  const ctx = useCtxSuperior()
  const { msg } = router.query
  enum onLoadMessages {
    "",
    "Boletim excluído com sucesso."
  }
  //#endregion statics

  //#region function
  const search = async () => {
    try {
      setLoading(true)

      const provider = new Provider()
      const response = await provider.call(
        "api",
        "boletim.listaboletim",
        {
          numero: numeroBE,
          data: boltimData,
          boletimTipo: boletimTipo,
          pagina: pagina,
          limite: limite
        },
        undefined,
        { headers: { credential: ctx.usuario?.credential } }
      )

      if (!response.success) throw new Error(response.message?.toString() || "")

      setListaBoletim(response.data.list)
      setTotal(response.data.count)

      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    } finally {
      setTimeout(() => {
        if (showAlert) setShowAlert(false)
      }, 6000)
    }
  }
  //#endregion function

  //#region effects
  useEffect(() => {
    if (!router.isReady) return
    try {
      if (msg) {
        const parsedId = parseInt(msg.toString())
        setAlerMessage(onLoadMessages[parsedId])
        setShowAlert(true)
      }
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
    } finally {
      setTimeout(() => {
        if (showAlert) setShowAlert(false)
      }, 6000)
    }
  }, [])
  //#endregion effects

  return (
    <PanelFrame
      dense
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Boletim eletrônico"
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
                <TextField
                  fullWidth
                  label="Número"
                  value={numeroBE}
                  onChange={event => {
                    setNumeroBE(+event.target.value.replace(/[^0-9]/g, ""))
                  }}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*"
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter") search()
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker
                    sx={{ width: "100%" }}
                    value={boltimData}
                    onChange={e => {
                      setBoletimData(e)
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="tipoBoletim">Tipo de boletim</InputLabel>

                  <Select
                    id="tipoBoletim"
                    label="Tipo de boletim"
                    value={boletimTipo}
                    onChange={e => {
                      setBoletimTipo(e.target.value ? +e.target.value : null)
                    }}
                  >
                    <MenuItem
                      key={`recurso-tipo-${0}-id-${0}`}
                      value=""
                      disabled
                    >
                      Selecione
                    </MenuItem>

                    {tipoLista.map((boletimTipo, i: any) => (
                      <MenuItem
                        key={`recurso-tipo-${i}-id-${boletimTipo.id}`}
                        value={boletimTipo.id}
                      >
                        {boletimTipo.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Button
                  variant="contained"
                  startIcon={<Search />}
                  fullWidth
                  size="large"
                  onClick={search}
                  onKeyDown={e => {
                    e.preventDefault()
                    if (e.key === "Enter") search()
                  }}
                >
                  Buscar
                </Button>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DataGrid
                  loading={loading}
                  headers={[
                    { align: "left", text: "titulo", attrName: "titulo" },
                    { align: "center", text: "Número", attrName: "numero" },
                    { align: "center", text: "Tipo", attrName: "tipo" },
                    { align: "center", text: "Data", attrName: "data" }
                  ]}
                  data={listaBoletim}
                  hasActions
                  actions={[
                    {
                      icon: <Visibility />,
                      name: "visualizar",
                      text: "Visualizar"
                    }
                  ]}
                  actionTrigger={(
                    id: number,
                    actionName: string,
                    sendExtraProp?: string | undefined
                  ) => {
                    if (actionName === "visualizar") {
                      router.push(`/boletim/${id}`)
                    }
                  }}
                  pagination={{
                    count: total,
                    rowsPerPage: limite,
                    page: pagina,
                    onPageChange: async (page: number) => {
                      try {
                        setLoading(true)
                        setPagina(page)

                        const provider = new Provider()
                        const response = await provider.call(
                          "api",
                          "boletim.listaboletim",
                          {
                            numero: numeroBE,
                            data: boltimData,
                            boletimTipo: boletimTipo,
                            pagina: page,
                            limite: limite
                          },
                          undefined,
                          { headers: { credential: ctx.usuario?.credential } }
                        )

                        if (!response.success)
                          throw new Error(response.message?.toString() || "")

                        setListaBoletim(response.data.list)
                        setTotal(response.data.count)

                        setLoading(false)
                      } catch (error: any) {
                        setAlerMessage(error.message)
                        setShowAlert(true)
                        setLoading(false)
                      } finally {
                        setTimeout(() => {
                          if (showAlert) setShowAlert(false)
                        }, 6000)
                      }
                    },
                    onRowsPerPageChange: async (rowsPerPAge: number) => {
                      try {
                        setLoading(true)
                        setLimite(rowsPerPAge)

                        const provider = new Provider()
                        const response = await provider.call(
                          "api",
                          "boletim.listaboletim",
                          {
                            numero: numeroBE,
                            data: boltimData,
                            boletimTipo: boletimTipo,
                            pagina: pagina,
                            limite: rowsPerPAge
                          },
                          undefined,
                          { headers: { credential: ctx.usuario?.credential } }
                        )

                        if (!response.success)
                          throw new Error(response.message?.toString() || "")

                        setListaBoletim(response.data.list)
                        setTotal(response.data.count)

                        setLoading(false)
                      } catch (error: any) {
                        setAlerMessage(error.message)
                        setShowAlert(true)
                        setLoading(false)
                      } finally {
                        setTimeout(() => {
                          if (showAlert) setShowAlert(false)
                        }, 6000)
                      }
                    },
                    rowsPerPageOptions: [5, 10, 25, 50, 100]
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PanelFrame>
  )
}

export default BoletimHome
