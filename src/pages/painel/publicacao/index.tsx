import { PanelFrame } from "@/components";
import CampanhaInfo from "@/components/campanhaInfo";
import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Fab, FormControl, Grid, InputLabel, MenuItem, Pagination, Paper, Select } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const publicacao: NextPage = props => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

  return <PanelFrame
    alerMessage={alerMessage}
    showAlert={showAlert}
    title="Publicações"
    locals={[
      {
        href: "/painel/inicio",
        iconName: "home",
        text: "Home"
      },
      {
        href: "/painel/publicacao",
        iconName: "podcasts",
        text: "Publicações"
      }
    ]}
    outsideContent={
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            router.push("/painel/publicacao/management/new")
          }}
        >
          <Add />
        </Fab>
      </Box>
    }
    closeAlert={() => {
      setShowAlert(false)
    }}
  >
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >filtros</AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <CampanhaInfo />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper sx={{ padding: 2 }}>linhas</Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper sx={{ padding: 2 }}>linhas</Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper sx={{ padding: 2 }}>linhas</Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper sx={{ padding: 2 }}>linhas</Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper sx={{ padding: 2 }}>linhas</Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper sx={{ padding: 2 }}>linhas</Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Pagination count={10} showFirstButton showLastButton />

          <Box sx={{ width: "110px", display: "flex", justifyContent: "space-between" }}>
            <FormControl fullWidth>
              <InputLabel id="select-label-show">Ver</InputLabel>
              <Select labelId="select-label-show" label="Ver">
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </PanelFrame>
}

export default publicacao