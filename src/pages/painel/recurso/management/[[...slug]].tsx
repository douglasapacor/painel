import { PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useContextMaster } from "@/context/Master"
import fetchApi from "@/lib/fetch"
import serverSide from "@/serverside/recursos"
import {
  actionFeatures,
  deviceList,
  featureManagement
} from "@/serverside/types/recursos"
import { deleteStyle } from "@/styles/objects/deleteStyle"
import { ArrowBackIosNew, Delete, Save } from "@mui/icons-material"
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

export const getServerSideProps: GetServerSideProps<
  featureManagement
> = async context => {
  return serverSide(context)
}

const recursoSelecionado: NextPage<featureManagement> = props => {
  const [id, setId] = useState<number | null>(props.feature.id)
  const [name, setName] = useState(props.feature ? props.feature.name : "")
  const [canonical, setCanonical] = useState(props.feature.canonical)
  const [actions, setActions] = useState<actionFeatures[]>(
    props.feature.actions
  )
  const [active, setActive] = useState(props.feature.active)
  const [visible, setVisible] = useState(props.feature.visible)
  const [deviceList, setDeviceList] = useState<deviceList[]>(props.device.list)
  const [deviceComponentsId, setDeviceComponentsId] = useState(
    props.feature.deviceComponentsId
  )
  const [icon, setIcon] = useState(props.feature.icon)
  const [path, setPath] = useState(props.feature.path)
  const [page, setPage] = useState(1)
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const router = useRouter()
  const ctx = useContextMaster()

  const requestConfirmation = () => {
    setDeleteModal(true)
  }

  const create = async () => {
    try {
      setLoading(true)

      const apiResult = await fetchApi.post(
        security.feature.new,
        {
          actions,
          name,
          canonical,
          active,
          visible,
          deviceComponentsId,
          icon,
          path
        },
        ctx.data ? ctx.data.credential : ""
      )

      if (!apiResult.success) throw new Error(apiResult.message)

      setLoading(false)
      setAlerMessage(apiResult.message || "")
      setShowAlert(true)

      setId(apiResult.data.id)

      router.push(`/painel/recurso/management/${apiResult.data.id}`)
    } catch (error: any) {
      setLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const update = async () => {
    try {
      setLoading(true)

      if (!id) throw new Error("Erro ao editar.")

      const apiResult = await fetchApi.put(
        security.feature.update(id),
        {
          actions,
          name,
          canonical,
          active,
          visible,
          deviceComponentsId,
          icon,
          path
        },
        ctx.data ? ctx.data.credential : ""
      )

      if (!apiResult.success) throw new Error(apiResult.message)

      setLoading(false)
      setAlerMessage(apiResult.message || "")
      setShowAlert(true)

      router.push(`/painel/recurso/management/${id}`)
    } catch (error: any) {
      setLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const deleteComponent = async () => {
    try {
      if (!id) throw new Error("Erro ao excluir Recurso")

      setDeleteModal(false)
      setLoading(true)

      const response = await fetchApi.del(
        security.feature.delete(id),
        ctx.data ? ctx.data.credential : ""
      )

      if (response.success) {
        setLoading(false)
        setAlerMessage(response.message || "")
        setShowAlert(true)
        router.push(`/painel/recurso`)
      } else throw new Error(response.message)
    } catch (error: any) {
      setDeleteModal(false)
      setLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const saveComponent = async () => {
    if (props.pageMode === "creating") await create()
    else if (props.pageMode === "visualizing") await update()
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

  const processAction = (index: number, checked: boolean) => {
    const tmp = [...actions]
    tmp[index].checked = checked
    setActions(tmp)
  }

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Recursos"
      loading={loading}
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/recurso",
          iconName: "featured_play_list",
          text: "Recursos"
        },
        {
          href:
            props.pageMode === "creating"
              ? "/painel/recurso/management/new"
              : `/painel/recurso/management/${
                  router.query.slug ? router.query.slug[0] : ""
                }`,
          iconName: props.locationIcon,
          text:
            props.pageMode === "creating"
              ? "Criando recurso"
              : "Vizualizando recurso"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  label="Nome do recurso"
                  fullWidth
                  value={name}
                  inputProps={{
                    maxLength: 40
                  }}
                  onChange={e => {
                    setName(e.target.value)
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  label="Nome Canónico"
                  fullWidth
                  value={canonical}
                  inputProps={{
                    maxLength: 40
                  }}
                  onChange={e => {
                    setCanonical(e.target.value)
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={active}
                      onChange={(_, checked) => {
                        setActive(checked)
                      }}
                    />
                  }
                  label="Ativo"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={visible}
                      onChange={(_, checked) => {
                        setVisible(checked)
                      }}
                    />
                  }
                  label="Visivel"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <FormControl fullWidth>
                  <InputLabel id="componentSelect">Componente</InputLabel>
                  <Select
                    value={deviceComponentsId}
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
                      setDeviceComponentsId(+e.target.value)
                    }}
                  >
                    <MenuItem value={0}>Selecione...</MenuItem>
                    {deviceList.map(device => (
                      <MenuItem
                        key={`device-item-${new Date().getDate()}-${
                          device.id
                        }-${device.deviceid}`}
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
                  label="ícone"
                  fullWidth
                  value={icon}
                  inputProps={{
                    maxLength: 40
                  }}
                  onChange={e => {
                    setIcon(e.target.value)
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  label="Path"
                  fullWidth
                  value={path}
                  inputProps={{
                    maxLength: 40
                  }}
                  onChange={e => {
                    setPath(e.target.value)
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    width: "100%",
                    border: "0.8px solid #757575",
                    borderRadius: 1,
                    paddingTop: 1,
                    paddingLeft: 2,
                    paddingRight: 2,
                    paddingBottom: 3
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="body2">Ações do recurso</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="caption" color="#BDBDBD">
                        <strong>
                          Selecione quais as ações o recurso possuirá e poderá
                          fornecer aos usuários.
                        </strong>
                      </Typography>
                    </Grid>
                    {actions.map((ac, index) => (
                      <Grid
                        key={`action-item-${ac.id}-${new Date().getDate()}`}
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={2}
                        xl={2}
                      >
                        <FormControlLabel
                          control={<Checkbox />}
                          label={ac.name}
                          checked={ac.checked}
                          onChange={(_, checked) => {
                            processAction(index, checked)
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>

              {props.feature.createdName && props.feature.createdAt && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="caption">
                    <strong>Criado por: </strong>
                    {props.feature.createdName}
                    <strong> em: </strong>
                    {new Date(
                      props.feature.createdAt ? props.feature.createdAt : ""
                    ).toLocaleDateString()}{" "}
                    {new Date(props.feature.createdAt).toLocaleTimeString()}
                    {props.feature.updatedName && props.feature.updatedAt && (
                      <>
                        <strong> Editado por: </strong>
                        {props.feature.updatedName}
                        <strong> em: </strong>
                        {new Date(
                          props.feature.updatedAt
                        ).toLocaleDateString()}{" "}
                        {new Date(props.feature.updatedAt).toLocaleTimeString()}
                      </>
                    )}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Button
              variant="contained"
              color="warning"
              endIcon={<ArrowBackIosNew />}
              onClick={() => {
                router.push("/painel/recurso")
              }}
            >
              Voltar
            </Button>

            <Button
              variant="contained"
              color="error"
              endIcon={<Delete />}
              onClick={() => {
                requestConfirmation()
              }}
            >
              excluir
            </Button>

            <Button
              variant="contained"
              endIcon={<Save />}
              onClick={saveComponent}
            >
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
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
                    setDeleteModal(false)
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={deleteComponent}
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

export default recursoSelecionado
