import { SiteFrame } from "@/components"
import { institucionalType } from "@/serverside/types/institucional"
import { Box, Container, Grid } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { serverSide } from "../../serverside/institucional"

export const getServerSideProps: GetServerSideProps<
  institucionalType
> = async context => {
  return serverSide(context)
}

const Institucional: NextPage<institucionalType> = ({ ...props }) => {
  return (
    <SiteFrame>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section
            style={{
              width: "100%",
              height: 250,
              fontSize: "1.7rem",
              backgroundImage:
                "url('/images/textura_banner.png'), url('/images/header_areas/institucional/banner.jpg')",
              backgroundPosition: "left top, center top",
              backgroundSize: "auto auto, 100%",
              backgroundRepeat: "repeat, no-repeat",
              backgroundColor: "#006092",
              backgroundBlendMode: "difference, multiply",
              position: "relative",
              overflow: "hidden",
              margin: "0 auto 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h1
              style={{
                fontFamily: "RobotoSlab",
                fontWeight: "normal",
                textTransform: "uppercase",
                color: "#fff"
              }}
            >
              Institucional
            </h1>
          </section>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h2
            style={{
              textAlign: "center",
              marginTop: "1em",
              marginBottom: "1em",
              color: "#006092",
              fontFamily: "RobotoSlab",
              fontWeight: 500,
              lineHeight: 1.1
            }}
          >
            Quem somos
          </h2>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            {props.description && (
              <div
                style={{
                  fontSize: "0.8rem",
                  margin: "0 0 10px",
                  textAlign: "justify",
                  lineHeight: 1.42857143,
                  fontFamily: "Arial, Helvetica, sans-serif"
                }}
                dangerouslySetInnerHTML={{ __html: props.description }}
              />
            )}
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h2
            style={{
              textAlign: "center",
              marginTop: "1em",
              marginBottom: "1em",
              color: "#006092",
              fontFamily: "RobotoSlab",
              fontWeight: 500,
              lineHeight: 1.1
            }}
          >
            O que fazemos
          </h2>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h2
            style={{
              textAlign: "center",
              marginTop: "1em",
              marginBottom: "1em",
              color: "#006092",
              fontFamily: "RobotoSlab",
              fontWeight: 500,
              lineHeight: 1.1
            }}
          >
            Informamos (Boletim Eletrônico INR)
          </h2>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h2
            style={{
              textAlign: "center",
              marginTop: "1em",
              marginBottom: "1em",
              color: "#006092",
              fontFamily: "RobotoSlab",
              fontWeight: 500,
              lineHeight: 1.1
            }}
          >
            Instruímos
          </h2>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={{ p: 2, background: "#EBEBEB" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <h2
                  style={{
                    textAlign: "center",
                    marginTop: "1em",
                    marginBottom: "1em",
                    color: "#006092",
                    fontFamily: "RobotoSlab",
                    fontWeight: 500,
                    lineHeight: 1.1
                  }}
                >
                  Dirigentes das Publicações INR
                </h2>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          <img
                            src={`/images/institucional/${props.curriculums[0].img}`}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <h3
                          style={{
                            textAlign: "center",
                            fontSize: "1.4rem",
                            fontFamily: "RobotoSlab",
                            color: "#006092"
                          }}
                        >
                          {props.curriculums[0].nome}
                        </h3>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          <img
                            src={`/images/institucional/${props.curriculums[1].img}`}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <h3
                          style={{
                            textAlign: "center",
                            fontSize: "1.4rem",
                            fontFamily: "RobotoSlab",
                            color: "#006092"
                          }}
                        >
                          {props.curriculums[1].nome}
                        </h3>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          <img
                            src={`/images/institucional/${props.curriculums[2].img}`}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <h3
                          style={{
                            textAlign: "center",
                            fontSize: "1.4rem",
                            fontFamily: "RobotoSlab",
                            color: "#006092"
                          }}
                        >
                          {props.curriculums[2].nome}
                        </h3>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Container>texto</Container>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </SiteFrame>
  )
}

export default Institucional
