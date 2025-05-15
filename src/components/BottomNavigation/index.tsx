import { Box, Container, Grid } from "@mui/material"
import type { FC } from "react"
const height = 280
const fontSize = "0.85em"
const pLeft = "20px"
const pTop = "20px"

export const BottomNavigation: FC = ({ ...props }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: height,
        background: theme => theme.palette.primary.dark
      }}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Box
              sx={{
                width: "100%",
                height: height,
                display: "flex",
                paddingTop: pTop,
                paddingLeft: pLeft,
                flexDirection: "column",
                color: "#F5F5F5",
                fontSize: fontSize,
                fontFamily: "Segoe UI, sans-serif"
              }}
            >
              <a>INSTITUCIONAL</a>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Box
              sx={{
                width: "100%",
                height: height,
                display: "flex",
                paddingTop: pTop,
                paddingLeft: pLeft,
                flexDirection: "column",
                color: "#F5F5F5",
                fontSize: fontSize,
                fontFamily: "Segoe UI, sans-serif"
              }}
            >
              <a>BOLETIM ELETRÔNICO</a>
              <a>Notícias</a>
              <a>Jurisprudência</a>
              <a>opnião</a>
              <a>Perguntas e Respostas</a>
              <a>Mensagen dos Editores</a>
              <a>Pareceres CGJ SP</a>
              <a>Suplementos da consultoria INR</a>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Box
              sx={{
                width: "100%",
                height: height,
                display: "flex",
                paddingTop: pTop,
                paddingLeft: pLeft,
                flexDirection: "column",
                color: "#F5F5F5",
                fontSize: fontSize,
                fontFamily: "Segoe UI, sans-serif"
              }}
            >
              <a>CLASSIFICADORES INR</a>
              <a>Classificadores INR PR</a>
              <a>Classificadores INR RS</a>
              <a>Classificadores INR SP</a>
              <a>Arquivos Acumulados dos Classificadores SP</a>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Box
              sx={{
                width: "100%",
                height: height,
                display: "flex",
                paddingTop: pTop,
                paddingLeft: pLeft,
                flexDirection: "column",
                color: "#F5F5F5",
                fontSize: fontSize,
                fontFamily: "Segoe UI, sans-serif"
              }}
            >
              <a>SALAS TEMÁTICAS</a>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Box
              sx={{
                width: "100%",
                height: height,
                display: "flex",
                paddingTop: pTop,
                paddingLeft: pLeft,
                flexDirection: "column",
                color: "#F5F5F5",
                fontSize: fontSize,
                fontFamily: "Segoe UI, sans-serif"
              }}
            >
              <a>SERVIÇOS</a>
              <a>Consultoria INR</a>
              <a>INR Cursos</a>
              <a>TV INR</a>
              <a>Consultoria Notorial e Registral</a>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Box
              sx={{
                width: "100%",
                height: height,
                display: "flex",
                paddingTop: pTop,
                paddingLeft: pLeft,
                flexDirection: "column",
                color: "#F5F5F5",
                fontSize: fontSize,
                fontFamily: "Segoe UI, sans-serif"
              }}
            >
              <a>BASE DE DADOS</a>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
