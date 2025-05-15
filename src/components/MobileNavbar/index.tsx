import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState, type FC } from "react";

export const MobileNavbar: FC = ({ ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: 100,
      }}
    >
      <Container>
        <Box sx={{ width: "100%", height: 100, alignContent: "center" }}>
          <IconButton
            onClick={handleClick}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>LOGO</MenuItem>
            <MenuItem>Usuario frame</MenuItem>
            <MenuItem>Institucional</MenuItem>
            <MenuItem>
              <Accordion
                elevation={0}
                disableGutters
                sx={{
                  backgroundColor: "transparent",
                }}
              >
                <AccordionSummary
                  sx={{
                    padding: 0,
                    minHeight: 0,
                    margin: 0,
                  }}
                  classes={{
                    content: "custom-accordion",
                  }}
                >
                  <span>Boletim Eletrônico INR</span>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <MenuItem>Notícias</MenuItem>
                  <MenuItem>Legislação</MenuItem>
                  <MenuItem>Perguntas e Respostas</MenuItem>
                  <MenuItem>Pareceres CGJ SP</MenuItem>
                  <MenuItem>Jurisprudência</MenuItem>
                  <MenuItem>Opnião</MenuItem>
                  <MenuItem>Mensagen dos Editores</MenuItem>
                  <MenuItem>Suplementos da consultoria INR</MenuItem>
                  <MenuItem>Entrevistas</MenuItem>
                </AccordionDetails>
              </Accordion>
            </MenuItem>
            <MenuItem>
              <Accordion
                elevation={0}
                disableGutters
                sx={{
                  backgroundColor: "transparent",
                }}
              >
                <AccordionSummary
                  sx={{
                    padding: 0,
                    minHeight: 0,
                  }}
                  classes={{
                    content: "custom-accordion",
                  }}
                >
                  <span>Classificadores INR</span>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <MenuItem>Classificadores INR PR</MenuItem>
                  <MenuItem>Classificadores INR RS</MenuItem>
                  <MenuItem>Classificadores INR SP</MenuItem>
                  <MenuItem>
                    Arquivos Acumulados dos Classificadores SP
                  </MenuItem>
                </AccordionDetails>
              </Accordion>
            </MenuItem>
            <MenuItem>Salas Temáticas</MenuItem>
            <MenuItem>
              <Accordion
                elevation={0}
                disableGutters
                sx={{
                  backgroundColor: "transparent",
                }}
              >
                <AccordionSummary
                  sx={{
                    padding: 0,
                    minHeight: 0,
                  }}
                  classes={{
                    content: "custom-accordion",
                  }}
                >
                  <span>Serviços</span>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: 0,
                    margin: 0,
                    marginTop: ".5rem",
                  }}
                >
                  <MenuItem>Consultoria INR</MenuItem>
                  <MenuItem>INR Cursos</MenuItem>
                  <MenuItem>TV INR</MenuItem>
                  <MenuItem>Consultoria Notorial e Registral</MenuItem>
                </AccordionDetails>
              </Accordion>
            </MenuItem>
            <MenuItem>Base de Dados</MenuItem>
            <MenuItem>Consultoria</MenuItem>
            <MenuItem>Download</MenuItem>
            <MenuItem>INR Contábil</MenuItem>
          </Menu>
        </Box>
      </Container>
    </Box>
  );
};

export default MobileNavbar;
