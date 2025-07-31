//#region imports
import { PanelFrame } from "@/components"
import { useCtxSuperior } from "@/context/Master"
import sanitize from "@/lib/sanitize"
import Provider from "@/provider"
import { serversideReponse } from "@/serverside/core/serversideResponse"
import management, {
  recursoManagementType
} from "@/serverside/recurso/management"
import { ArrowBackIosNew, Delete, ExpandMore, Save } from "@mui/icons-material"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
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
//#endregion imports

//#region getServersideProps
export const getServerSideProps: GetServerSideProps<
  serversideReponse<recursoManagementType>
> = async context => {
  return management(context)
}
//#endregion getServersideProps

const recursoSelecionado: NextPage<
  serversideReponse<recursoManagementType>
> = props => {
  //#region states
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState<number | undefined>(props.data.id ?? undefined)
  const [showDeleteFrame, setShowDeleteFrame] = useState(false)
  const [nome, setNome] = useState<string | undefined>(
    props.data.nome ?? undefined
  )
  const [recursoTipoId, setRecursoTipoId] = useState<number | undefined>(
    props.data.recurso_tipo_id ?? undefined
  )
  const [tag, setTag] = useState<string | undefined>(
    props.data.tag ?? undefined
  )
  const [icone, setIcone] = useState<string | undefined>(
    props.data.icone ?? undefined
  )
  const [url, setUrl] = useState<string | undefined>(
    props.data.url ?? undefined
  )
  const [ativo, setAtivo] = useState<boolean>(props.data.ativo ?? false)
  const [criadopor, setCriadopor] = useState<string | undefined>(
    props.metadata.detalhes.criacao?.nome ?? undefined
  )
  const [criadoem, setCriadoem] = useState<Date | null>(
    props.metadata.detalhes.criacao
      ? (props.metadata.detalhes.criacao.data as Date)
      : null
  )
  const [editadopor, setEditadopor] = useState<string | undefined>(
    props.metadata.detalhes.edicao?.nome ?? undefined
  )
  const [editadoem, setEditadoem] = useState<Date | null>(
    props.metadata.detalhes.edicao
      ? (props.metadata.detalhes.edicao.data as Date)
      : null
  )
  //#endregion states

  //#region static
  const router = useRouter()
  const ctx = useCtxSuperior()
  //#endregion static

  //#region functions
  const saveComponent = async () => {
    try {
      if (!nome || nome === "") throw new Error("Nome é obrigatório")
      if (!tag || tag === "") throw new Error("Insira um valor para 'Tag'")
      if (!icone || icone === "") throw new Error("Icone é obrigatório")
      if (!url || url === "") throw new Error("Insira um valor para 'url'")
      if (!recursoTipoId) throw new Error("Selecione um recurso")

      setLoading(true)

      const provider = new Provider()
      const apiResponse = await provider.call<{
        id: number
        criadonome: string
        criadoem: Date
        editadonome: string
        editadoem: Date
      }>(
        "api",
        "recurso.salvar",
        {
          id,
          nome,
          recurso_tipo_id: recursoTipoId,
          tag,
          icone,
          ativo,
          url
        },
        undefined,
        { headers: { credential: ctx.usuario?.credencial } }
      )

      if (!apiResponse.success) throw new Error(apiResponse.message?.toString())

      if (apiResponse.data && apiResponse.data.id) setId(apiResponse.data.id)

      if (apiResponse.data && apiResponse.data.criadonome)
        setCriadopor(apiResponse.data.criadonome)

      if (apiResponse.data && apiResponse.data.criadoem)
        setCriadoem(apiResponse.data.criadoem)

      if (apiResponse.data && apiResponse.data.editadonome)
        setEditadopor(apiResponse.data.editadonome)

      if (apiResponse.data && apiResponse.data.editadoem)
        setEditadoem(apiResponse.data.editadoem)

      setLoading(false)
      setAlerMessage(apiResponse.message?.toString() || "")
      setShowAlert(true)
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
      setLoading(false)
    } finally {
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
    }
  }

  const deleteThis = async () => {
    try {
      setShowDeleteFrame(false)
      setLoading(true)

      const provider = new Provider()
      const response = await provider.call(
        "api",
        "recurso.excluir",
        undefined,
        { id: id },
        {
          headers: { credential: ctx.usuario?.credencial }
        }
      )

      if (!response.success) throw new Error(response.message?.toString())

      setAlerMessage("Recurso excluido com sucesso.")
      setShowAlert(true)

      setTimeout(() => {
        router.push("/recurso")
      }, 600)
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
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
          href: "/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/recurso",
          iconName: "featured_play_list",
          text: "Recursos"
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
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <TextField
                    name="nome"
                    variant="outlined"
                    label="Nome"
                    placeholder="nome do recurso"
                    fullWidth
                    value={nome}
                    onChange={e => {
                      setNome(e.target.value)
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <TextField
                    name="tag"
                    variant="outlined"
                    label="Tag"
                    fullWidth
                    value={tag}
                    onChange={e => {
                      setTag(sanitize(e.target.value).urlFriendly())
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <TextField
                    name="icone"
                    variant="outlined"
                    label="Ícone"
                    fullWidth
                    value={icone}
                    onChange={e => {
                      setIcone(e.target.value)
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                    name="url"
                    variant="outlined"
                    label="Url"
                    fullWidth
                    value={url}
                    onChange={e => {
                      setUrl(e.target.value)
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="tipoRecurso">
                      Tipo de recurso
                    </InputLabel>
                    <Select
                      id="tipoRecurso"
                      label="Tipo de recurso"
                      value={recursoTipoId}
                      defaultValue={undefined}
                      onChange={e => {
                        setRecursoTipoId(+e.target.value)
                      }}
                    >
                      <MenuItem value={undefined}>Selecione</MenuItem>

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
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
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

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Accordion elevation={0}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">Detalhes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              border: `1px solid ${
                                !criadopor ? "#BDBDBD" : "rgba(0, 0, 0, 0.87)"
                              }`,
                              borderRadius: "3px",
                              padding: 10
                            }}
                          >
                            <Grid container>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: !criadopor
                                      ? "#BDBDBD"
                                      : "rgba(0, 0, 0, 0.87)"
                                  }}
                                >
                                  <strong>criação:</strong>
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: !criadopor
                                      ? "#BDBDBD"
                                      : "rgba(0, 0, 0, 0.87)"
                                  }}
                                >
                                  {!criadopor
                                    ? `-------- -------- | --/--/---- --:--`
                                    : `${criadopor} | ${
                                        criadoem
                                          ? new Date(
                                              criadoem
                                            ).toLocaleDateString()
                                          : ""
                                      } ${
                                        criadoem
                                          ? new Date(
                                              criadoem
                                            ).toLocaleTimeString()
                                          : ""
                                      }`}
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              border: `1px solid ${
                                !editadopor ? "#BDBDBD" : "rgba(0, 0, 0, 0.87)"
                              }`,
                              borderRadius: "3px",
                              padding: 10
                            }}
                          >
                            <Grid container>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: !editadopor
                                      ? "#BDBDBD"
                                      : "rgba(0, 0, 0, 0.87)"
                                  }}
                                >
                                  <strong>alteração:</strong>
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: !editadopor
                                      ? "#BDBDBD"
                                      : "rgba(0, 0, 0, 0.87)"
                                  }}
                                >
                                  {!editadopor
                                    ? `-------- -------- | --/--/---- --:--`
                                    : `${editadopor} | ${
                                        editadoem
                                          ? `${new Date(
                                              editadoem
                                            ).toLocaleDateString()} ${new Date(
                                              editadoem
                                            ).toLocaleTimeString()}`
                                          : ""
                                      }`}
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </form>
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
                router.push("/recurso")
              }}
            >
              Voltar
            </Button>

            <Button
              variant="contained"
              color="error"
              endIcon={<Delete />}
              onClick={() => {
                setShowDeleteFrame(true)
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

export default recursoSelecionado
