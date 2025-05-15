import {
  Add,
  ArrowBack,
  ArrowBackIos,
  ArrowDownward,
  ArrowForward,
  ArrowForwardIos,
  ArrowUpward,
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  Visibility
} from "@mui/icons-material"
import {
  Box,
  Button,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@mui/material"
import { FC, useState } from "react"

const Columns: FC<{
  id: number
  name: string
  cards: { id: number; name: string }[]
}> = props => {
  const [columnEl, setColumnEl] = useState<null | HTMLElement>(null)
  const [cardEl, setCardEl] = useState<null | HTMLElement>(null)
  const open = Boolean(columnEl)
  const openCard = Boolean(cardEl)

  const handleClick = (event: any) => {
    setColumnEl(event.currentTarget)
  }

  const handleClose = () => {
    setColumnEl(null)
  }

  const handleCardClick = (event: any) => {
    setCardEl(event.currentTarget)
  }

  const handleCardClose = () => {
    setCardEl(null)
  }

  return (
    <div className="TaskColumn">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid container spacing={1} sx={{ color: "white", fontSize: "10pt" }}>
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
              <Box sx={{ paddingLeft: 2, userSelect: "none" }}>
                {props.name}
              </Box>
            </Grid>

            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <div style={{ cursor: "pointer" }} onClick={handleClick}>
                  <MoreHoriz fontSize="small" />
                </div>
              </Box>

              <Menu
                anchorEl={columnEl}
                open={open}
                onClose={handleClose}
                sx={{
                  "& .MuiMenu-paper": {
                    backgroundColor: "#212121",
                    color: "white"
                  }
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Edit fontSize="small" sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText>Renomear lista</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Delete fontSize="small" sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText>Excluir lista</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Add fontSize="small" sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText>Adicionar cartão</ListItemText>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ArrowBack fontSize="small" sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText>Mover p/ Esquerda</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ArrowForward fontSize="small" sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText>Mover p/ Direita</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ArrowBackIos fontSize="small" sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText>Mover p/ o inicio</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ArrowForwardIos fontSize="small" sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText>Mover p/ o fim</ListItemText>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>

        {props.cards.map((cards, cardIndex) => (
          <Grid
            key={`column-id-${props.id}-card-id-${cards.id}-key-${cardIndex}`}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Box
              sx={{
                width: "100%",
                height: "70px",
                background: "#424242",
                borderRadius: 1,
                cursor: "pointer"
              }}
              onClick={() => {}}
            >
              <div
                style={{
                  color: "white",
                  fontFamily: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Noto Sans",
                    "Ubuntu",
                    "Droid Sans",
                    "Helvetica Neue",
                    "sans-serif"
                  ].join(","),
                  fontSize: "14px",
                  fontWeight: "400",
                  width: "100%",
                  marginBottom: "4px",
                  padding: "6px"
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    sx={{ userSelect: "none" }}
                    item
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {cards.name}
                  </Grid>

                  <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={handleCardClick}
                    >
                      <MoreHoriz fontSize="small" />
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}></Grid>
                </Grid>

                <Menu
                  anchorEl={cardEl}
                  open={openCard}
                  onClose={handleCardClose}
                  sx={{
                    "& .MuiMenu-paper": {
                      backgroundColor: "#212121",
                      color: "white"
                    }
                  }}
                >
                  <MenuItem onClick={handleCardClose}>
                    <ListItemIcon>
                      <Visibility fontSize="small" sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText>Visualizar</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleCardClose}>
                    <ListItemIcon>
                      <Edit fontSize="small" sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText>Renomear cartão</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleCardClose}>
                    <ListItemIcon>
                      <ArrowDownward fontSize="small" sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText>Mover p/ baixo</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleCardClose}>
                    <ListItemIcon>
                      <KeyboardArrowDown
                        fontSize="small"
                        sx={{ color: "white" }}
                      />
                    </ListItemIcon>
                    <ListItemText>Mover p/ o fim</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleCardClose}>
                    <ListItemIcon>
                      <ArrowUpward fontSize="small" sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText>Mover p/ cima</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleCardClose}>
                    <ListItemIcon>
                      <KeyboardArrowUp
                        fontSize="small"
                        sx={{ color: "white" }}
                      />
                    </ListItemIcon>
                    <ListItemText>Mover p/ o início</ListItemText>
                  </MenuItem>
                </Menu>
              </div>
            </Box>
          </Grid>
        ))}

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button
            sx={{ color: "white" }}
            variant="text"
            fullWidth
            startIcon={<Add />}
          >
            Adicionar Cartão
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Columns
