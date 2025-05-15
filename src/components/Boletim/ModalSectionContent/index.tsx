import DataGrid from "@/components/DataGrid"
import { Close, Delete, Search } from "@mui/icons-material"
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from "@mui/material"
import { FC } from "react"
import style from "./style"
import { modalSectionContentType } from "./type"

const ModalSectionContent: FC<modalSectionContentType> = props => {
  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.close()
      }}
    >
      <Box sx={style.background}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={style.title}>
              <Typography variant="h6">{props.title}</Typography>
              <IconButton
                size="small"
                onClick={() => {
                  props.close()
                }}
              >
                <Close sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TableContainer sx={{ maxHeight: "300px" }}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Etiam neque turpis, sollicitudin nec nibh nec, malesuada
                      porttitor sem. Integer tempor, nisi sit amet tincidunt
                      efficitur, purus nulla rutrum tortor, et rhoncus felis
                      metus eu leo. Suspendisse ante ante, varius ut nisi at,
                      accumsan placerat justo. Nam luctus, nulla et consectetur
                      tempus, turpis lacus efficitur nunc, sit amet elementum
                      diam ipsum nec urna. Phasellus eget malesuada dui. Integer
                      quis nunc elit. Mauris sed massa iaculis, vestibulum lorem
                      quis, tincidunt lectus. Suspendisse rhoncus fermentum
                      pellentesque.
                    </TableCell>
                    <TableCell sx={{ width: "5%" }}>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <IconButton size="small">
                          <Delete sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
            <TextField fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
            <Button fullWidth variant="contained" endIcon={<Search />}>
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DataGrid />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ModalSectionContent
