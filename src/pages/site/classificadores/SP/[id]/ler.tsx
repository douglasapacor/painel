import { SiteFrame } from "@/components"
import ClassifierContent from "@/components/Classifiers/ClassifierContent"
import legacy from "@/config/actions/legacy"
import fetchApi from "@/lib/fetch"
import { Box, Container, Divider, Grid, Typography } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"

type classifierType = {
  id: number | null
  idestado: number | null
  sigla: string | null
  datacad: string | null
  titulo: string | null
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
          datacad: string
          anexos: {}[]
        }[]
      }[]
    }[]
  }[]
}

export const getServerSideProps: GetServerSideProps<
  classifierType
> = async context => {
  try {
    if (!context.params) throw new Error("1")
    if (!context.params.id) throw new Error("1")

    const classifierIndex = await fetchApi.get(
      legacy.classificadores.selectIndex(+context.params.id)
    )

    if (!classifierIndex.success || !classifierIndex.data) throw new Error("1")

    return {
      props: classifierIndex.data
    }
  } catch (error: any) {
    return {
      props: {
        id: null,
        idestado: null,
        sigla: null,
        datacad: null,
        titulo: null,
        actsTotal: null,
        barra: [],
        ids: {}
      },
      redirect: `/site/inicio?erro=${error.message}`
    }
  }
}

const ReadSP: NextPage<classifierType> = props => {
  return (
    <SiteFrame>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section
            style={{
              width: "100%",
              fontSize: "1.4rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              whiteSpace: "preserve-breaks",
              textAlign: "center",
              userSelect: "none"
            }}
          >
            <h1
              style={{
                fontFamily: "RobotoSlab",
                fontWeight: "500",
                textTransform: "uppercase",
                color: "#006092"
              }}
            >
              {props.titulo}
            </h1>
          </section>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Box
              sx={{ width: "100%", border: "1px solid #212121", padding: 5 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="body2">
                    <strong>Índice</strong>
                  </Typography>
                </Grid>

                {props.barra.map(barra => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    key={`${barra.id}barra-title-${new Date().getDate()}`}
                  >
                    <a className="barra-cl" href={`#barra_${barra.id}`}>
                      {barra.titulo}
                    </a>

                    <Grid container spacing={1}>
                      {barra.orgao.map(orgao => (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                          key={`orgao-title-${new Date().getDate()}`}
                        >
                          <a className="orgao-cl">{orgao.titulo}</a>
                          <Grid container spacing={1}>
                            {orgao.departamento.map(dep => (
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                                key={`departamento-title-${new Date().getDate()}`}
                              >
                                <a
                                  href={`#departamento-${dep.id}-ancor`}
                                  className="dep-cl"
                                >
                                  {dep.nome}
                                </a>
                                <Grid container spacing={1}>
                                  {dep.atos.map(ato => (
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={12}
                                      xl={12}
                                      key={`${
                                        ato.id
                                      }-ato-title-${new Date().getDate()}`}
                                    >
                                      <a
                                        href={`#${ato.ancora}`}
                                        className="ato-cl"
                                      >
                                        {ato.titulo}
                                      </a>
                                    </Grid>
                                  ))}
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
            </Box>
          </Container>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={{ minHeight: "30px" }} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Divider />
          </Container>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={{ minHeight: "30px" }} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <ClassifierContent barra={props.barra} ids={props.ids} />
          </Container>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Divider />
          </Container>
        </Grid>
      </Grid>
    </SiteFrame>
  )
}

export default ReadSP
