import { SiteFrame } from "@/components"
import { serverSide } from "@/helpers/serverside/atoAnterior"
import { atoAnteriorServerProps } from "@/serverside/types/atoAnterior"
import { Box, Container, Grid } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"

export const getServerSideProps: GetServerSideProps<
  atoAnteriorServerProps
> = async context => {
  return serverSide(context)
}

const ClassifiersAtoAnterior: NextPage<atoAnteriorServerProps> = props => {
  return (
    <SiteFrame>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section
            style={{
              width: "100%",
              height: "100px",
              fontSize: "1.4rem",
              backgroundPosition: "left top, center top",
              backgroundSize: "auto auto, 100%",
              backgroundRepeat: "repeat, no-repeat",
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
                color: "#006092"
              }}
            >
              Arquivos Acumulados dos Classificadores SP
            </h1>
          </section>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h6
            style={{
              fontFamily: "RobotoSlab",
              fontWeight: "500",
              textTransform: "uppercase",
              color: "#006092"
            }}
          >
            <section
              style={{
                width: "100%",
                fontSize: "1.4rem",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                whiteSpace: "preserve-breaks",
                textAlign: "center"
              }}
            >
              {props.ano}
            </section>
          </h6>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Grid container spacing={2}>
              {props.list.map(i => (
                <Grid
                  item
                  key={`bar-content-item-${i.idato}-${new Date().getDate()}`}
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <Box sx={{ width: "100%", backgroundColor: i.cor }}>
                    <h3 id={`#barra_${i.idato}`} className="bar-content-title">
                      {i.barra_titulo}
                    </h3>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </SiteFrame>
  )
}

export default ClassifiersAtoAnterior
