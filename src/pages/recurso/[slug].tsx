import { PanelFrame } from "@/components"
import { useCtxSuperior } from "@/context/Master"
import sanitize from "@/lib/sanitize"
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
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

export const getServerSideProps: GetServerSideProps<
  serversideReponse<recursoManagementType>
> = async context => {
  return management(context)
}

const recursoSelecionado: NextPage<
  serversideReponse<recursoManagementType>
> = props => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState<number | undefined>(props.data.id ?? undefined)
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
  const [criadopor, setCriadopor] = useState<string | undefined>(
    props.metadata.detalhes.criacao?.nome ?? undefined
  )
  const [criadoem, setCriadoem] = useState<Date | null>(
    props.metadata.detalhes.criacao
      ? new Date(props.metadata.detalhes.criacao.data ?? "")
      : null
  )
  const [editadopor, setEditadopor] = useState<string | undefined>(
    props.metadata.detalhes.edicao?.nome ?? undefined
  )
  const [editadoem, setEditadoem] = useState<Date | null>(
    props.metadata.detalhes.edicao
      ? new Date(props.metadata.detalhes.edicao.data ?? "")
      : null
  )
  const router = useRouter()
  const ctx = useCtxSuperior()

  const saveComponent = async () => {}

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
                    value={tag}
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
                    value={tag}
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
                    >
                      <MenuItem value={undefined}>Selecione</MenuItem>

                      {props.data.tipoLista &&
                        props.data.tipoLista.map((recursotipo: any, i: any) => (
                          <MenuItem
                            key={`recurso-tipo-item-${i}-index`}
                            value={recursotipo.id}
                          >
                            {`${recursotipo.nome}: #${recursotipo.tag}`}
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
                    <FormControlLabel control={<Switch />} label="Ativo" />
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
                              border: "1px solid #999999",
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
                                    : `${criadopor} | ${criadoem}`}
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
                              border: "1px solid #999999",
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
                                    : `${editadopor} | ${editadoem}`}
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
              onClick={() => {}}
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
    </PanelFrame>
  )
}

export default recursoSelecionado
