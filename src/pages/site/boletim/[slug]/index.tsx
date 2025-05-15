import { SiteFrame } from "@/components"
import legacy from "@/config/actions/legacy"
import fetchApi from "@/lib/fetch"
import sanitize from "@/lib/sanitize/index"
import { KeyboardArrowDown } from "@mui/icons-material"
import { Box, Button, Container, Divider, Grid } from "@mui/material"
import he from "he"
import parse from "html-react-parser"
import { GetServerSideProps, NextPage } from "next"

type bulletinProps = {
  title: string
  description: string | null
  tag: string
  subtitle: string
  extra: { id: number; titulo: string }[] | null
  list: { id: number; titulo: string; datacad: string }[]
}

type slugsString =
  | "noticias"
  | "legislacoes"
  | "jurisprudencias"
  | "opinioes"
  | "perguntas-e-respostas"
  | "mensagens-editores"
  | "pareceresCGJ"
  | "suplementos"
  | "historias"

type slugTagsType = Record<
  slugsString,
  {
    title: string
    descriptionId: number
    subtitle: string
  }
>

const slugTags: slugTagsType = {
  noticias: {
    title: "Notí­cias",
    descriptionId: 5,
    subtitle: "Últimas Notí­cias"
  },
  legislacoes: {
    title: "Legislação",
    descriptionId: 7,
    subtitle: "Últimos Atos Legais"
  },
  jurisprudencias: {
    title: "Jurisprudência",
    descriptionId: 6,
    subtitle: "Últimas Decisões"
  },
  opinioes: { title: "Opinião", descriptionId: 9, subtitle: "Últimos Artigos" },
  "perguntas-e-respostas": {
    title: "Perguntas e Respostas",
    descriptionId: 10,
    subtitle: "Últimas Consultas"
  },
  "mensagens-editores": {
    title: "Mensagens dos Editores",
    descriptionId: 26,
    subtitle: "Últimas Mensagens"
  },
  pareceresCGJ: {
    title:
      "Pareceres não divulgados no DJe — \n\tCorregedoria Geral da Justiça do Estado de São Paulo",
    descriptionId: 8,
    subtitle: `Últimos Pareceres CGJ SP`
  },
  suplementos: {
    title: "Suplementos da Consultoria INR",
    descriptionId: 15,
    subtitle: "Suplementos da Consultoria INR"
  },
  historias: {
    title: "Histórias do ofício",
    descriptionId: 46,
    subtitle: "Últimas Histórias"
  }
}

export const getServerSideProps: GetServerSideProps<
  bulletinProps
> = async context => {
  const tag =
    context.params && context.params.slug
      ? context.params.slug.toString()
      : null
  const pageData = slugTags[tag as keyof typeof slugTags]
  const desc = await fetchApi.get(
    legacy.boletim.description(pageData.descriptionId)
  )

  if (!tag) throw new Error("Erro ao carregar a página.")

  let fetch
  let extra = null

  switch (tag) {
    case "noticias":
      fetch = await await fetchApi.get(legacy.boletim.news.home)
      break
    case "legislacoes":
      fetch = await await fetchApi.get(legacy.boletim.legislation.home)
      break
    case "jurisprudencias":
      fetch = await await fetchApi.get(legacy.boletim.jurisprudence.home)
      break
    case "opinioes":
      fetch = await await fetchApi.get(legacy.boletim.opinion.home)
      break
    case "perguntas-e-respostas":
      fetch = await await fetchApi.get(legacy.boletim.questionAndAnswer.home)
      break
    case "mensagens-editores":
      fetch = await await fetchApi.get(legacy.boletim.messagesEditors.home)
      break
    case "pareceresCGJ":
      fetch = await await fetchApi.get(legacy.boletim.pareceres.home)
      break
    case "suplementos":
      extra = await fetchApi.get(legacy.boletim.supplements.temas)
      fetch = await await fetchApi.get(legacy.boletim.supplements.home)
      break
    default:
      fetch = { success: false }
      break
  }

  if (fetch.success) {
    return {
      props: {
        title: pageData.title,
        description: desc.data ? desc.data : null,
        tag,
        extra: extra ? extra.data : null,
        subtitle: pageData.subtitle,
        list: fetch.data ? fetch.data : []
      }
    }
  } else {
    return {
      props: {
        title: pageData.title,
        description: desc.data ? desc.data : null,
        tag,
        extra: extra ? extra.data : null,
        subtitle: pageData.subtitle,
        list: []
      }
    }
  }
}

const BeFrame: NextPage<bulletinProps> = props => {
  return (
    <SiteFrame>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section
            style={{
              width: "100%",
              height: "250px",
              fontSize: "1.8rem",
              backgroundImage: `url('/images/textura_banner.png'), url('/images/header_areas/${props.tag}/banner.png')`,
              backgroundPosition: "left top, center top",
              backgroundSize: "auto auto, 100%",
              backgroundRepeat: "repeat, no-repeat",
              backgroundColor: "#006092",
              backgroundBlendMode: "difference, multiply",
              backgroundAttachment: "scroll, fixed",
              position: "relative",
              overflow: "hidden",
              margin: "0 auto 1em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              whiteSpace: "preserve-breaks",
              textAlign: "center"
            }}
          >
            <h1
              style={{
                fontFamily: "RobotoSlab",
                fontWeight: "500",
                textTransform: "uppercase",
                color: "#fff"
              }}
            >
              {props.title}
            </h1>
          </section>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                margin: "2em auto 3em",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "14px",
                lineHeight: "1.42857143",
                color: "#333"
              }}
              dangerouslySetInnerHTML={{
                __html: props.description ? props.description : ""
              }}
            />
          </Container>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <div
              style={{
                width: "100%"
              }}
            >
              <h2
                style={{
                  fontSize: "1.9rem",
                  fontFamily: "RobotoSlab",
                  marginTop: 0,
                  marginBottom: "1em",
                  color: "#006092"
                }}
              >
                {props.subtitle}
              </h2>
            </div>
          </Container>
        </Grid>

        {props.tag === "suplementos" && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {props.extra && (
              <Container>
                <Box
                  sx={{
                    width: "100%",
                    marginBottom: "40px",
                    marginTop: "10px"
                  }}
                >
                  <Grid container spacing={2}>
                    {props.extra.map((item, index) => (
                      <Grid
                        key={`supplements-item-${index}`}
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        lg={3}
                        xl={3}
                      >
                        <Button fullWidth variant="contained">
                          {item.titulo}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Container>
            )}
          </Grid>
        )}

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <ul className="be-main-ul">
              {props.list.map((i, index) => (
                <li
                  className="be-main-li"
                  key={`${index}-list-item-${new Date().getDate()}`}
                >
                  <a
                    className="be-main-a"
                    href={`/site/boletim/${props.tag}/${i.id}/${sanitize(
                      parse(
                        he.decode(i.titulo).replace(/<\/?p>/g, "")
                      ).toString()
                    ).urlFriendly()}`}
                  >
                    <time datatype="ano-mes-dia">{`[ + ]  ${
                      i.datacad
                    } ${he.decode(" &ndash; ")}`}</time>

                    <strong>
                      {parse(he.decode(`${i.titulo}`).replace(/<\/?p>/g, ""))}
                    </strong>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Box sx={{ width: "100%", marginBottom: "15px" }}>
              <div className="be-main-load-more-button">
                <strong>
                  Clique aqui e veja mais
                  <br />
                  {props.title}
                </strong>
                <br />
                <KeyboardArrowDown
                  className="load-more_icon"
                  sx={{
                    fontSize: 50
                  }}
                />
              </div>
            </Box>
          </Container>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Divider
              color="#2196F3"
              sx={{ height: 1, width: "100%", marginBottom: "15px" }}
            />
          </Container>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Box sx={{ width: "100%" }}>
              <a className="be-main-db-button">
                Não encontrou o que procurava?{" "}
                <strong>
                  Clique aqui e realize uma busca na Base de Dados INR.
                </strong>
              </a>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </SiteFrame>
  )
}

export default BeFrame
