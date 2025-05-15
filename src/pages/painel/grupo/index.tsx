import { DataGrid, PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useContextMaster } from "@/context/Master"
import fetchApi from "@/lib/fetch"
import { deleteStyle } from "@/styles/objects/deleteStyle"
import { Add } from "@mui/icons-material"
import {
  Box,
  Button,
  Divider,
  Fab,
  FormControlLabel,
  Grid,
  Icon,
  Modal,
  Paper,
  Switch,
  TextField
} from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

const GrupoIndex: NextPage = props => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [name, setName] = useState<string>("")
  const [canon, setCanon] = useState<string>("")
  const [active, setActive] = useState(false)
  const [superG, setSuperG] = useState(false)
  const [gridData, setGridData] = useState<
    {
      id: number
      name: string
      canonical: string
      color: string
      active: boolean
      icon: string
      super: boolean
    }[]
  >([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [gridLoading, setGridLoading] = useState(false)
  const [deleteThis, setDeleteThis] = useState<number | null>(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const router = useRouter()
  const ctx = useContextMaster()

  const search = async () => {
    try {
      setGridLoading(true)

      const dataSearch = await fetchApi.post(
        security.group.search,
        {
          name: name,
          canonical: canon,
          active: active,
          super: superG,
          limit: rowsPerPage,
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

  const requestConfirmation = (id: number) => {
    setDeleteThis(id)
    setDeleteModal(true)
  }

  const deleteGroup = async () => {
    try {
      if (!deleteThis) throw new Error("Erro ao excluir Grupo")

      setGridLoading(true)
      setDeleteModal(false)

      const response = await fetchApi.del(
        security.group.delete(deleteThis),
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

  const handlePage = async (p: number) => {
    try {
      setGridLoading(true)
      setPage(p)

      const dataSearch = await fetchApi.post(
        security.group.search,
        {
          name: name,
          canonical: canon,
          active: active,
          super: superG,
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
        security.group.search,
        {
          name: name,
          canonical: canon,
          active: active,
          super: superG,
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

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Grupo de segurança"
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/grupo",
          iconName: "group_work",
          text: "Grupo de segurança"
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
              router.push("/painel/grupo/management/new")
            }}
          >
            <Add />
          </Fab>
        </Box>
      }
    >
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2} alignItems="center" textAlign="center">
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              fullWidth
              label="nome"
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
              label="nome canónico"
              value={canon}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  search()
                }
              }}
              onChange={event => {
                setCanon(event.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={active}
                    onChange={(_, checked) => {
                      setActive(checked)
                    }}
                  />
                }
                label="ativo"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={superG}
                    onChange={(_, checked) => {
                      setSuperG(checked)
                    }}
                  />
                }
                label="super"
              />
            </Box>
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
                  text: "nome canónico",
                  attrName: "canonical",
                  align: "left"
                }
              ]}
              hasActions
              actions={[
                {
                  icon: <Icon>visibility</Icon>,
                  name: "showGroup",
                  text: "Visualizar"
                },
                {
                  icon: <Icon>delete</Icon>,
                  name: "deleteGroup",
                  text: "Excluir"
                }
              ]}
              actionTrigger={(id: number, actionName: string) => {
                switch (actionName) {
                  case "showGroup":
                    router.push(`/painel/grupo/management/${id}`)
                    break
                  case "deleteGroup":
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
                    setDeleteThis(null)
                    setDeleteModal(false)
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={deleteGroup}
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

export default GrupoIndex
