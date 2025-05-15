import { DataGrid, PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useContextMaster } from "@/context/Master"
import fetchApi from "@/lib/fetch"
import { serverSide } from "@/serverside/recursosIndex"
import { deviceList } from "@/serverside/types/recursos"
import { featureIndexServerSide } from "@/serverside/types/recursosIndex"
import { deleteStyle } from "@/styles/objects/deleteStyle"
import { Add } from "@mui/icons-material"
import {
  Box,
  Button,
  Divider,
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
  SelectChangeEvent,
  Switch,
  TextField
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

export const getServerSideProps: GetServerSideProps<
  featureIndexServerSide
> = async context => {
  return serverSide(context)
}

const recursos: NextPage<featureIndexServerSide> = props => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [name, setName] = useState("")
  const [canonical, setCanonical] = useState("")
  const [deviceId, setDeviceId] = useState(0)
  const [active, setActive] = useState(true)
  const [visible, setVisible] = useState(true)
  const [icon, setIcon] = useState("")
  const [path, setPath] = useState("")
  const [gridData, setGridData] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [gridLoading, setGridLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteThis, setDeleteThis] = useState<number | undefined>(undefined)
  const [deviceList, setDeviceList] = useState<deviceList[]>(props.device.list)
  const ctx = useContextMaster()
  const router = useRouter()

  const requestConfirmation = (id: number) => {
    setDeleteThis(id)
    setDeleteModal(true)
  }

  const deleteFeature = async () => {
    try {
      if (!deleteThis) throw new Error("Erro ao excluir recurso")

      setGridLoading(true)
      setDeleteModal(false)

      const response = await fetchApi.del(
        security.feature.delete(deleteThis),
        ctx.data ? ctx.data.credential : ""
      )

      if (response.success) {
        setGridLoading(false)
        setAlerMessage(response.message || "")
        setShowAlert(true)
        search()
      } else throw new Error(response.message)
    } catch (error: any) {
      setDeleteModal(false)
      setGridLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const search = async () => {
    try {
      setGridLoading(true)

      const dataSearch = await fetchApi.post(
        security.feature.search,
        {
          name: name,
          canonical: canonical,
          active: active,
          visible: visible,
          deviceComponentsId: deviceId,
          icon: icon,
          path: path,
          limit: rowsPerPage,
          offset: page
        },
        ctx.data ? ctx.data.credential : ""
      )

      if (!dataSearch.success) throw new Error(dataSearch.message)

      setCount(dataSearch.data.count)
      setGridData(dataSearch.data.list)
      setGridLoading(false)
    } catch (error: any) {
      setGridLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const handlePage = async (p: number) => {
    try {
      setGridLoading(true)
      setPage(p)

      const dataSearch = await fetchApi.post(
        security.feature.search,
        {
          name: name,
          canonical: canonical,
          active: active,
          visible: visible,
          deviceComponentsId: deviceId,
          icon: icon,
          path: path,
          limit: rowsPerPage,
          offset: p
        },
        ctx.data ? ctx.data.credential : ""
      )

      if (!dataSearch.success) throw new Error(dataSearch.message)

      setGridData(dataSearch.data.list)
      setCount(dataSearch.data.count)
      setGridLoading(false)
    } catch (error: any) {
      setGridLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const handleRowsPerPage = async (rpp: number) => {
    try {
      setGridLoading(true)
      setRowsPerPage(rpp)

      const dataSearch = await fetchApi.post(
        security.feature.search,
        {
          name: name,
          canonical: canonical,
          active: active,
          visible: visible,
          deviceComponentsId: deviceId,
          icon: icon,
          path: path,
          limit: rpp,
          offset: page
        },
        ctx.data ? ctx.data.credential : ""
      )

      if (!dataSearch.success) throw new Error(dataSearch.message)

      setGridData(dataSearch.data.list)
      setCount(dataSearch.data.count)
      setGridLoading(false)
    } catch (error: any) {
      setGridLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const loadMoreItems = async (e: any) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight

    if (bottom && deviceList.length < props.device.length) {
      const dataSearch = await fetchApi.post(
        security.feature.search,
        {
          name: "",
          deviceId: 0,
          limit: 5,
          offset: page
        },
        ctx.data ? ctx.data.credential : ""
      )

      if (!dataSearch.success) throw new Error(dataSearch.message)

      setDeviceList(list => [...list, ...dataSearch.data.list])
      setPage(p => {
        return p + 1
      })
    }
  }

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Recursos"
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/componente",
          iconName: "featured_play_list",
          text: "Recursos"
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
              router.push("/painel/recurso/management/new")
            }}
          >
            <Add />
          </Fab>
        </Box>
      }
    >
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              fullWidth
              label="Nome"
              value={name}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  search()
                }
              }}
              onChange={event => {
                setName(event.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              fullWidth
              label="Nome canónico"
              value={canonical}
              onChange={event => {
                setCanonical(event.target.value)
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  search()
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <FormControlLabel
              label="Ativo"
              control={
                <Switch
                  checked={active}
                  onChange={(_, checked) => {
                    setActive(checked)
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <FormControlLabel
              label="Visível"
              control={
                <Switch
                  checked={visible}
                  onChange={(_, checked) => {
                    setVisible(checked)
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <FormControl fullWidth>
              <InputLabel id="componentSelect">Componente</InputLabel>
              <Select
                value={deviceId}
                MenuProps={{
                  PaperProps: {
                    onScroll: loadMoreItems
                  },
                  style: {
                    maxHeight: 335
                  }
                }}
                label="Componente"
                labelId="componentSelect"
                onChange={(e: SelectChangeEvent<number>) => {
                  setDeviceId(+e.target.value)
                }}
              >
                <MenuItem value={0}>Selecione...</MenuItem>
                {deviceList.map(device => (
                  <MenuItem
                    key={`device-item-${new Date().getDate()}-${device.id}-${
                      device.deviceid
                    }`}
                    value={device.id}
                  >
                    {device.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              fullWidth
              label="Ícone"
              value={icon}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  search()
                }
              }}
              onChange={event => {
                setIcon(event.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              fullWidth
              label="path"
              value={icon}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  search()
                }
              }}
              onChange={event => {
                setPath(event.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button variant="contained" fullWidth onClick={search}>
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DataGrid
              data={gridData}
              loading={gridLoading}
              headers={[
                {
                  text: "Nome",
                  attrName: "name",
                  align: "left"
                },
                {
                  text: "Nome Canónico",
                  attrName: "canonical",
                  align: "left"
                },
                {
                  text: "Ícone",
                  attrName: "icon",
                  custom: {
                    isIcon: true
                  },
                  align: "center"
                },
                {
                  text: "Path",
                  attrName: "path",
                  align: "left"
                },
                {
                  text: "componente",
                  attrName: "devicecomponentsname",
                  align: "left"
                }
              ]}
              hasActions
              actions={[
                {
                  icon: <Icon>visibility</Icon>,
                  name: "showComponent",
                  text: "Visualizar"
                },
                {
                  icon: <Icon>delete</Icon>,
                  name: "deleteComponent",
                  text: "Excluir"
                }
              ]}
              actionTrigger={(id: number, actionName: string) => {
                switch (actionName) {
                  case "showComponent":
                    router.push(`/painel/recurso/management/${id}`)
                    break
                  case "deleteComponent":
                    requestConfirmation(id)
                    break
                }
              }}
              pagination={{
                count: count,
                page: page,
                rowsPerPage: rowsPerPage,
                rowsPerPageOptions: [10, 20, 30, 60],
                onPageChange(page) {
                  handlePage(page)
                },
                onRowsPerPageChange(rowsPerPAge) {
                  handleRowsPerPage(rowsPerPAge)
                }
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Modal
        open={deleteModal}
        onClose={() => {
          setDeleteModal(false)
        }}
      >
        <Box sx={deleteStyle}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1
                }}
              >
                <h4>EXCLUSÃO DE CONTEÚDO</h4>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                sx={{
                  paddingLeft: 4,
                  paddingRight: 4,
                  marginBottom: 4
                }}
              >
                Você tem certeza que deseja excluir esse item ? Essa ação é
                irreversível.
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setDeleteThis(undefined)
                    setDeleteModal(false)
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={deleteFeature}
                >
                  Confirmar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </PanelFrame>
  )
}

export default recursos
