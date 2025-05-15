import legacy from "@/config/actions/legacy"
import fetchApi from "@/lib/fetch"
import { ArrowUpward, ExpandMore } from "@mui/icons-material"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  Skeleton
} from "@mui/material"
import he from "he"
import parse from "html-react-parser"
import { FC, useState } from "react"

type classifierBarContent = {
  ids: Record<
    number,
    {
      secao: string | null
      especie: string | null
      numero: string | null
      vara: string | null
      comarca: string | null
      texto: string | null
      loading: boolean
    }
  >
  barra: {
    id: number
    titulo: string
    cor: string
    orgao: {
      id: number
      titulo: string
      departamento: {
        id: number
        nome: string
        atos: {
          id: number
          titulo: string
          ancora: string
          anexos: {}[]
          datacad: string
        }[]
      }[]
    }[]
  }[]
}

type actContentType = Record<
  number,
  {
    secao: string | null
    especie: string | null
    numero: string | null
    vara: string | null
    comarca: string | null
    texto: string | null
    loading: boolean
  }
>

const ClassifierContent: FC<classifierBarContent> = ({ ...props }) => {
  const [actContent, setActContent] = useState<actContentType>(props.ids)
  const [logado] = useState(true)
  const readClassifierContent = async (id: number, isExpanded: boolean) => {
    if (logado) {
      if (actContent[id].texto === null) {
        if (isExpanded) {
          let tmp = { ...actContent }
          tmp[id].loading = true
          setActContent(tmp)

          const actContentResponse = await fetchApi.get(
            legacy.classificadores.selectContent(id),
            "eyJhbGciOiJIUzI1NiJ9.eyJpZGNsaWVudGUiOjIyNjIsImlkdXN1YXJpbyI6NzU0MywiaWRncnVwb19zaXRlIjoxLCJhZG1pbiI6Ik4iLCJhdXRvcml6YWNhb190cmFiYWxoaXN0YSI6Ik4ifQ.wtqAHjEzKhWTKb-hFNrgVj4PikNLYLccsXlucJssvLI"
          )

          if (actContentResponse.success) {
            tmp[id] = {
              ...tmp[id],
              comarca: actContentResponse.data.comarca,
              especie: actContentResponse.data.especie,
              numero: actContentResponse.data.numero,
              secao: actContentResponse.data.secao,
              texto: actContentResponse.data.texto,
              vara: actContentResponse.data.vara,
              loading: false
            }

            setTimeout(() => {
              setActContent({ ...tmp })
            }, 600)
          }
        }
      }
    }
  }

  return (
    <Grid container spacing={2}>
      {props.barra.map(barra => (
        <Grid
          key={`bar-content-item-${barra.id}-${new Date().getDate()}`}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Box sx={{ width: "100%", backgroundColor: barra.cor }}>
            <h3 id={`#barra_${barra.id}`} className="bar-content-title">
              {barra.titulo}
            </h3>
          </Box>

          <Grid container spacing={2}>
            {barra.orgao.map(orgao => (
              <Grid
                key={`organ-content-item-${orgao.id}-${new Date().getDate()}`}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <Box
                  sx={{
                    margin: "0 !important",
                    color: "#000 !important",
                    fontSize: "16px",
                    fontWeight: "bolder",
                    width: "96%",
                    padding: "2%",
                    fontFamily: "Arial, Helvetica, sans-serif"
                  }}
                >
                  {orgao.titulo}
                </Box>

                <Grid container spacing={2}>
                  {orgao.departamento.map(dep => (
                    <Grid
                      key={`dep-content-item-${dep.id}-${new Date().getDate()}`}
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <Box
                        sx={{
                          marginTop: "0",
                          marginBottom: "1em",
                          color: "#1A1A4E !important",
                          fontSize: "16px",
                          width: "96%",
                          padding: "0 2%",
                          fontFamily: "Arial, Helvetica, sans-serif",
                          textAlign: "center",
                          fontWeight: "500",
                          lineHeight: "1.1"
                        }}
                      >
                        <h4>{dep.nome}</h4>
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <h5 className="act-content-date">
                            {dep.atos[0].datacad}
                          </h5>
                          <Divider />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Grid container spacing={2}>
                            {dep.atos.map(ato => (
                              <Grid
                                key={`ato-content-item-${
                                  ato.id
                                }-${new Date().getDate()}`}
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                >
                                  <Accordion
                                    sx={{ backgroundColor: "#FAFAFA" }}
                                    disabled={logado ? false : true}
                                    defaultExpanded={logado ? false : true}
                                    elevation={0}
                                    onChange={(
                                      _: React.SyntheticEvent,
                                      isExpanded: boolean
                                    ) => {
                                      readClassifierContent(ato.id, isExpanded)
                                    }}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMore />}
                                    >
                                      <p
                                        className="act-content-line"
                                        id={`${ato.ancora}`}
                                      >
                                        <strong>{ato.titulo}</strong>
                                      </p>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      {!logado ? (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            fontFamily:
                                              "Arial, Helvetica, sans-serif"
                                          }}
                                        >
                                          Realize a autenticação de usuário
                                          clicando no ícone{"  "}(
                                          {
                                            <Icon
                                              sx={{ fontSize: 10 }}
                                              color="primary"
                                            >
                                              key
                                            </Icon>
                                          }
                                          ) no topo da página e veja o conteúdo
                                          completo
                                        </Box>
                                      ) : actContent[ato.id].loading ? (
                                        <div>
                                          {actContent[ato.id].loading}
                                          <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1rem" }}
                                          />
                                          <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1rem" }}
                                          />
                                          <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1rem" }}
                                          />
                                          <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1rem" }}
                                          />
                                          <Skeleton
                                            variant="text"
                                            sx={{
                                              fontSize: "1rem",
                                              marginBottom: 1
                                            }}
                                          />
                                          <Skeleton
                                            variant="rectangular"
                                            height={300}
                                          />
                                        </div>
                                      ) : (
                                        <Box sx={{ width: "100%" }}>
                                          <div
                                            style={{
                                              width: "100%",
                                              margin: "2em auto 0",
                                              fontFamily:
                                                "Arial, Helvetica, sans-serif",
                                              fontSize: "14px",
                                              lineHeight: "1.42857143",
                                              color: "#333"
                                            }}
                                          >
                                            {parse(
                                              he
                                                .decode(
                                                  `${
                                                    actContent[ato.id].especie
                                                      ? `Espécie: ${
                                                          actContent[ato.id]
                                                            .especie
                                                        } <br/>`
                                                      : ""
                                                  }${
                                                    actContent[ato.id].secao
                                                      ? `Se&ccedil;&atilde;o: ${
                                                          actContent[ato.id]
                                                            .secao
                                                        } <br/>`
                                                      : ""
                                                  }${
                                                    actContent[ato.id].numero
                                                      ? `Número: ${
                                                          actContent[ato.id]
                                                            .numero
                                                        } <br/>`
                                                      : ""
                                                  }${
                                                    actContent[ato.id].vara
                                                      ? `Vara: ${
                                                          actContent[ato.id]
                                                            .vara
                                                        } <br/>`
                                                      : ""
                                                  }${
                                                    actContent[ato.id].comarca
                                                      ? `Comarca: ${
                                                          actContent[ato.id]
                                                            .comarca
                                                        } <br/>`
                                                      : ""
                                                  }`
                                                )
                                                .replace(/<\/?p>/g, "")
                                            )}
                                            <br />
                                            <div
                                              style={{
                                                width: "100%",
                                                margin: "2em auto 0",
                                                fontFamily:
                                                  "Arial, Helvetica, sans-serif",
                                                fontSize: "13px",
                                                lineHeight: "1.42857143",
                                                color: "#333"
                                              }}
                                            >
                                              {parse(
                                                he.decode(
                                                  `${
                                                    actContent[ato.id].texto
                                                      ? actContent[ato.id].texto
                                                      : ""
                                                  }`
                                                )
                                              )}
                                            </div>
                                            <Box
                                              sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "right",
                                                alignContent: "center",
                                                marginRight: 1
                                              }}
                                            >
                                              <Button
                                                variant="text"
                                                startIcon={<ArrowUpward />}
                                                onClick={() => {
                                                  // document.location =`/site/classificadores/SP/${props.}/ler#ClassIndexIndentifier`

                                                  return false
                                                }}
                                              >
                                                Voltar ao indice
                                              </Button>
                                            </Box>
                                          </div>
                                        </Box>
                                      )}
                                    </AccordionDetails>
                                  </Accordion>
                                </Grid>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default ClassifierContent
