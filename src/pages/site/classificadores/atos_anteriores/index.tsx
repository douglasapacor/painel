import { SiteFrame } from "@/components"
import { serverSide } from "@/helpers/serverside/atosAnteriores"
import { atosAnterioresServerProps } from "@/serverside/types/atosAnteriores"
import { Container, Grid } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"

export const getServerSideProps: GetServerSideProps<
  atosAnterioresServerProps
> = async context => {
  return serverSide(context)
}

const ClassifiersAtosAnteriores: NextPage<
  atosAnterioresServerProps
> = props => {
  return (
    <SiteFrame>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section
            style={{
              width: "100%",
              height: "250px",
              fontSize: "1.4rem",
              backgroundImage: `url('/images/textura_banner.png'), url('/images/header_areas/suplementos/banner.png')`,
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
              Arquivos Acumulados dos Classificadores SP
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
                Índice
              </h2>
            </div>
          </Container>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <ul className="be-main-ul">
              {props.atos &&
                props.atos.map((i, index) => (
                  <li
                    className="be-main-li"
                    key={`${index}-list-item-${new Date().getDate()}`}
                  >
                    <a
                      className="be-main-a"
                      href={`/site/classificadores/atos_anteriores/${i.idato}/${i.ano}`}
                    >
                      <time datatype="ano-mes-dia">{`[ + ] ${
                        i.tipo === "C"
                          ? `${i.ano} (ano corrente) - Arquivos prontos para correição`
                          : i.ano
                      }`}</time>
                    </a>
                  </li>
                ))}
            </ul>
          </Container>
        </Grid>
      </Grid>
    </SiteFrame>
  )
}

export default ClassifiersAtosAnteriores
