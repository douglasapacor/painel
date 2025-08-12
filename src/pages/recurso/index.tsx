//#region imports
import DataGrid from "@/components/DataGrid"
import PanelFrame from "@/components/PanelFrame"
import { useCtxSuperior } from "@/context/Master"
import Provider from "@/provider"
import { recursolista } from "@/provider/dto/recursoLista"
import { serversideReponse } from "@/serverside/core/serversideResponse"
import home, { recursoHomeType } from "@/serverside/recurso/home"
import { Add, Delete, Search, Visibility } from "@mui/icons-material"
import {
  Box,
  Button,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Switch,
  TextField,
  Typography
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
//#endregion

//#region getServersideProps
export const getServerSideProps: GetServerSideProps<
  serversideReponse<recursoHomeType>
> = async context => {
  return home(context)
}
//#endregion getServersideProps

const Recursos: NextPage<serversideReponse<recursoHomeType>> = props => {
  //#region states
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [showDeleteFrame, setShowDeleteFrame] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)
  const [ativo, setAtivo] = useState(true)
  const [loading, setLoading] = useState(false)
  const [griLoading, setGriLoading] = useState(false)
  const [gridList, setGridList] = useState<
    Array<{
      id: number
      nome: string
      url: string
      tag: string
      recurso_tipo_id: number
      recurso_tipo_nome: string
      ativo: boolean
    }>
  >(props.data.list ? props.data.list : [])
  const [gridListCount, setGridListCount] = useState<number | null>(
    props.data.count ? props.data.count : 0
  )
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [recursoTipoId, setRecursoTipoId] = useState<number>(0)
  const [searchText, setSearchText] = useState<string>("")
  //#endregion states

  //#region statics
  const router = useRouter()
  const ctx = useCtxSuperior()
  //#endregion statics

  //#region functions
  const actionsTriggers = (
    id: number,
    actionName: string,
    sendExtraProp?: string | undefined
  ) => {
    switch (actionName) {
      case "selecionar": {
        setLoading(true)
        setTimeout(() => {
          router.push(`/recurso/${id}`)
        }, 1000)
        break
      }
      case "excluir": {
        setIdToDelete(id)
        setShowDeleteFrame(true)
        break
      }
    }
  }

  const deleteThis = async () => {
    try {
      setGriLoading(true)
      const provider = new Provider()

      const response = await provider.call(
        "api",
        "recurso.excluir",
        undefined,
        { id: idToDelete },
        {
          headers: { credential: ctx.usuario?.credencial }
        }
      )

      if (!response.success) throw new Error(response.message?.toString())

      setIdToDelete(null)

      const apiData = await provider.call<recursolista>(
        "api",
        "recurso.list",
        {
          recurso_tipo_id: recursoTipoId === 0 ? 1 : recursoTipoId,
          search: searchText,
          ativo: ativo,
          limite: rowsPerPage,
          pagina: page
        },
        undefined,
        {
          headers: {
            credential: ctx.usuario?.credencial
          }
        }
      )

      setShowDeleteFrame(false)

      if (!apiData.success) throw new Error(apiData.message?.toString())

      setGridList(apiData.data?.list || [])
      setGridListCount(apiData.data?.count || 0)
      setGriLoading(false)
      setAlerMessage("Recurso excluido com sucesso.")
      setShowAlert(true)
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
    } finally {
      setGriLoading(false)
      setLoading(false)
    }
  }

  const refreshData = async () => {
    try {
      if (recursoTipoId === 0) throw new Error("Seleciona um tipo de recurso.")
      setGriLoading(true)

      const provider = new Provider()
      const providerResponse = await provider.call<recursoHomeType>(
        "api",
        "recurso.list",
        {
          recurso_tipo_id: recursoTipoId,
          search: searchText,
          ativo: ativo,
          limite: rowsPerPage,
          pagina: page
        }
      )

      if (!providerResponse.success)
        throw new Error("Erro ao buscar resultados.")

      setGridList(providerResponse.data ? providerResponse.data.list : [])
      setGridListCount(providerResponse.data ? providerResponse.data.count : 0)
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
    } finally {
      setGriLoading(false)
      setLoading(false)
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
    }
  }
  //#endregion functions

  return (
    <PanelFrame
      dense
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Recursos"
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
              router.push("/recurso/new")
            }}
          >
            <Add />
          </Fab>
        </Box>
      }
    >
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <TextField
              label="busca"
              fullWidth
              placeholder="Digite algo para procurar recursos."
              onKeyDown={e => {
                if (e.key === "Enter") {
                  refreshData()
                }
              }}
              onChange={e => {
                setSearchText(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={ativo}
                    onChange={(
                      _: ChangeEvent<HTMLInputElement>,
                      checked: boolean
                    ) => {
                      setAtivo(checked)
                    }}
                  />
                }
                label="Ativo"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="tipoRecurso">Tipo de recurso</InputLabel>
              <Select
                id="tipoRecurso"
                label="Tipo de recurso"
                value={recursoTipoId}
                defaultValue={0}
                onChange={e => {
                  setRecursoTipoId(+e.target.value)
                }}
              >
                <MenuItem key={`recurso-tipo-${0}-id-${0}`} value={0}>
                  Selecione um tipo
                </MenuItem>
                {props.data.tipoLista &&
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
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Button
              variant="contained"
              endIcon={<Search />}
              fullWidth
              onClick={refreshData}
            >
              procurar
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DataGrid
              data={gridList}
              headers={[
                { text: "Nome", align: "left", attrName: "nome" },
                { text: "Tag", align: "center", attrName: "tag" },
                { text: "Url", align: "left", attrName: "url" },
                { text: "Tipo", align: "center", attrName: "recurso_tipo_nome" }
              ]}
              actions={[
                {
                  icon: <Visibility />,
                  name: "selecionar",
                  text: "Selecionar"
                },
                { icon: <Delete />, name: "excluir", text: "Excluir" }
              ]}
              hasActions
              actionTrigger={actionsTriggers}
              loading={griLoading}
              pagination={{
                count: gridListCount ?? 0,
                rowsPerPage: rowsPerPage,
                page: page,
                rowsPerPageOptions: [5, 10, 25, 50, 100],
                onPageChange: async page => {
                  try {
                    if (recursoTipoId === 0)
                      throw new Error("Seleciona um tipo de recurso.")

                    setGriLoading(true)
                    setPage(page)

                    const provider = new Provider()
                    const providerResponse =
                      await provider.call<recursoHomeType>(
                        "api",
                        "recurso.list",
                        {
                          recurso_tipo_id: recursoTipoId,
                          search: searchText,
                          ativo: ativo,
                          limite: rowsPerPage,
                          pagina: page
                        }
                      )

                    if (!providerResponse.success)
                      throw new Error("Erro ao buscar resultados.")

                    setGridList(
                      providerResponse.data ? providerResponse.data.list : []
                    )
                    setGridListCount(
                      providerResponse.data ? providerResponse.data.count : 0
                    )
                  } catch (error: any) {
                    setAlerMessage(error.message)
                    setShowAlert(true)
                  } finally {
                    setGriLoading(false)
                    setLoading(false)
                    setTimeout(() => {
                      setShowAlert(false)
                    }, 6000)
                  }
                },
                onRowsPerPageChange: async rows => {
                  try {
                    if (recursoTipoId === 0)
                      throw new Error("Seleciona um tipo de recurso.")

                    setGriLoading(true)
                    setRowsPerPage(rows)

                    const provider = new Provider()
                    const providerResponse =
                      await provider.call<recursoHomeType>(
                        "api",
                        "recurso.list",
                        {
                          recurso_tipo_id: recursoTipoId,
                          search: searchText,
                          ativo: ativo,
                          limite: rows,
                          pagina: page
                        }
                      )

                    if (!providerResponse.success)
                      throw new Error("Erro ao buscar resultados.")

                    setGridList(
                      providerResponse.data ? providerResponse.data.list : []
                    )
                    setGridListCount(
                      providerResponse.data ? providerResponse.data.count : 0
                    )
                  } catch (error: any) {
                    setAlerMessage(error.message)
                    setShowAlert(true)
                  } finally {
                    setGriLoading(false)
                    setLoading(false)
                    setTimeout(() => {
                      setShowAlert(false)
                    }, 6000)
                  }
                }
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Modal open={showDeleteFrame}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container justifyItems="center" alignItems="center">
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <Icon color="error" fontSize="large">
                    delete
                  </Icon>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                  <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                    Excluir Recurso
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography variant="body1">
                Clique em confirmar para excluir o recurso.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                onClick={() => {
                  setShowDeleteFrame(false)
                  setIdToDelete(null)
                }}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Button
                fullWidth
                color="warning"
                variant="contained"
                onClick={deleteThis}
              >
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </PanelFrame>
  )
}

export default Recursos
