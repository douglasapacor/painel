import { Box, Grid, Paper } from "@mui/material"
import { FC } from "react"

const CampanhaInfo: FC = () => {
  return (
    <Paper>
      <Grid container>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Box sx={{ display: "flex" }}></Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CampanhaInfo
