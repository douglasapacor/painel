import { SiteFrame } from "@/components"
import legacy from "@/config/actions/legacy"
import fetchApi from "@/lib/fetch"
import { Container, Grid } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"

type classifiersSP = {
  description: string | null
  list:
    | {
        id: number
        label: string
        tipo: string
        datacad: string
        data_ordem: string
      }[]
    | null
}

export const getServerSideProps: GetServerSideProps<
  classifiersSP
> = async () => {
  try {
    const desc = await fetchApi.get(legacy.boletim.description(13))
    const state = await fetchApi.get(legacy.classificadores.stateInfo("SP"))

    const list = await fetchApi.get(
      `${legacy.classificadores.home}?id=${
        state.data.idestado
      }&limit=${12}&page=${0}`
    )
    return {
      props: {
        description: desc.data ? desc.data : null,
        list: list.data ? list.data : null
      }
    }
  } catch (error: any) {
    return {
      props: { description: null, list: null },
      redirect: `/site/inicio?erro=1`
    }
  }
}

const ClassifiersSP: NextPage<classifiersSP> = props => {
  return (
    <SiteFrame>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section
            style={{
              width: "100%",
              height: "250px",
              fontSize: "1.4rem",
              backgroundImage: `url('/images/textura_banner.png'), url('/images/header_areas/banner_sp.jpg')`,
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
              Classificadores INR SP
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
              {props.list &&
                props.list.map((i, index) => (
                  <li
                    className="be-main-li"
                    key={`${index}-list-item-${new Date().getDate()}`}
                  >
                    <a
                      className="be-main-a"
                      href={`/site/classificadores/SP/${i.id}/ler`}
                    >
                      <time datatype="ano-mes-dia">{`[ + ] ${i.datacad}`}</time>
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

export default ClassifiersSP
