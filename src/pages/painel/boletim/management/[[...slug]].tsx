import { ModalSectionContent, PanelFrame } from "@/components"
import { serverSide } from "@/serverside/boletimManagement"
import {
  boletimManagement,
  buletimType,
  sectionType
} from "@/serverside/types/buletimManagement"
import { ArrowBack, Delete, Save } from "@mui/icons-material"
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useEffect, useState } from "react"

export const getServerSideProps: GetServerSideProps<
  boletimManagement
> = async context => {
  return serverSide(context)
}

const BoletimContent: NextPage<boletimManagement> = props => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  const [deleteModal, setDeleteModal] = useState(false)
  const [contentPositionModal, setContentPositionModal] = useState(false)

  // Modal Add content in section
  const [sectionContentModal, setSectionContentModal] = useState(false)
  const [addSectionName, setAddSectionName] = useState<string>("")

  // Lista para alimentar select
  const [boletim, setBoletim] = useState<buletimType>(props.buletim)
  const [selectedSections, setSelectedSections] = useState<number[]>([])

  useEffect(() => {
    let final: sectionType[] = []

    for (let i = 0; i < selectedSections.length; i++) {
      const finded = boletim?.section.find(
        item => item.id === selectedSections[i]
      )

      if (finded) {
        final.push(finded)
      } else {
        const sec = props.sectionsList.find(
          sec => sec.id === selectedSections[i]
        )

        final.push({
          sectionId: selectedSections[i],
          nome: sec ? sec.name : "",
          color: sec ? sec.color : "",
          itens: []
        })
      }
    }

    const tmp = { ...boletim }
    tmp.section = final

    setBoletim(tmp)
  }, [selectedSections])

  const addContentInSection = (sectionName: string, sectionId: number) => {
    try {
      setAddSectionName(sectionName)
      setSectionContentModal(true)
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const deleteContentInSection = (index: number) => {}

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Boletim"
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/boletim",
          iconName: "list_alt",
          text: "Boletins"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper
            sx={{
              paddingLeft: 2,
              paddingRight: 2,
              paddingTop: 2,
              paddingBottom: 4
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
                <Box
                  sx={{
                    width: "100%",
                    height: "120px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <FormControl>
                    <FormLabel id="tipo-be-radio-button">
                      Tipo de boletim
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="tipo-be-radio-button"
                      defaultValue={props.buletim.boletimType}
                    >
                      <FormControlLabel
                        value="be"
                        control={<Radio />}
                        label="BE"
                      />
                      <FormControlLabel
                        value="ieptb"
                        control={<Radio />}
                        label="IEPTB"
                      />
                      <FormControlLabel
                        value="classificadores"
                        control={<Radio />}
                        label="Classificadores"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                <div
                  style={{
                    width: "100%",
                    height: "120px",
                    background: "#424242",
                    border: "4px solid rgba(0, 0, 0, 0.3)",
                    borderRadius: 2
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "35px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      color: "white"
                    }}
                  >
                    <strong>Nº</strong>
                  </div>
                  <div
                    style={{
                      width: "150px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      left: "50%",
                      transform: "translate(-50%)",
                      color: "white",
                      fontFamily: "Segoe UI, sans-serif",
                      fontSize: "22pt",
                      fontWeight: "600"
                    }}
                  >
                    12345
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  <strong>CONTEÚDO DO BOLETIM</strong>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body2" sx={{ color: "#BDBDBD" }}>
                  Selecione quais as sessões estarão presente no boletim.
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl fullWidth>
                  <InputLabel id="sections-bulletin-item">
                    Sessões do boletim
                  </InputLabel>
                  <Select
                    labelId="sections-bulletin-item"
                    label="Sessões do boletim"
                    input={<OutlinedInput label="Sessões do boletim" />}
                    multiple
                    value={selectedSections}
                    renderValue={selected =>
                      `${selected.length} selecionado(s)`
                    }
                    onChange={(event: SelectChangeEvent<number[]>) => {
                      setSelectedSections(event.target.value as number[])
                    }}
                  >
                    {props.sectionsList.map(item => (
                      <MenuItem
                        key={`menu-item-section-${item.id}`}
                        value={item.id}
                      >
                        <Checkbox
                          checked={selectedSections.includes(item.id)}
                        />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Resumo dos itens do boletim
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container spacing={2} alignItems="center">
                  {boletim.section.length <= 0 ? (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="body2" sx={{ color: "#B0BEC5" }}>
                        Selecione uma seção para visualizar o resumo do BE.
                      </Typography>
                    </Grid>
                  ) : (
                    boletim.section.map((secItem, index) => (
                      <Grid
                        key={`item-section-${index}-count`}
                        item
                        xs={12}
                        sm={1.5}
                        md={1.5}
                        lg={1.5}
                        xl={1.5}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "80px",
                            background: secItem.color,
                            border: "3px solid rgba(0, 0, 0, 0.3);",
                            borderRadius: 1,
                            display: "block",
                            textAlign: "center",
                            fontSize: "10pt",
                            lineHeight: 1.3,
                            pt: 1
                          }}
                        >
                          <p style={{ margin: 0 }}>{secItem.nome}</p>
                          <p style={{ marginTop: 3, marginBottom: 0 }}>
                            {secItem.itens.length}
                          </p>
                        </Box>
                      </Grid>
                    ))
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Detalhamento do conteúdo
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    width: "100%",
                    p: 1,
                    border: "2px solid #B0BEC5",
                    borderRadius: 1
                  }}
                >
                  {boletim.section.length <= 0 ? (
                    <Typography variant="body2" sx={{ color: "#B0BEC5" }}>
                      Selecione uma seção para criar o contéudo do boletim.
                    </Typography>
                  ) : (
                    <Grid container spacing={2} alignItems="center">
                      {boletim.section.map((secContent, secIndex) => (
                        <Grid
                          key={`content-section-${secIndex}-count`}
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                        >
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                              <Box
                                sx={{
                                  width: "100%",
                                  height: "45px",
                                  pl: 2,
                                  background: secContent.color,
                                  display: "flex",
                                  alignItems: "center",
                                  color: "white"
                                }}
                              >
                                {`${secContent.nome} - ${secContent.itens.length}`}
                              </Box>
                            </Grid>

                            <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
                              <Box
                                sx={{
                                  width: "100%",
                                  height: "45px",
                                  background: secContent.color,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-evenly"
                                }}
                              >
                                <IconButton
                                  onClick={() => {
                                    addContentInSection(
                                      secContent.nome,
                                      secContent.sectionId
                                    )
                                  }}
                                >
                                  <Icon style={{ fontSize: 16 }}>add</Icon>
                                </IconButton>
                                <IconButton
                                  onClick={() => {
                                    deleteContentInSection(secIndex)
                                  }}
                                >
                                  <Icon style={{ fontSize: 16 }}>delete</Icon>
                                </IconButton>
                              </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Box
                                sx={{
                                  width: "100%",
                                  p: 2,
                                  borderLeft: "2px solid black",
                                  borderBottom: "2px solid black",
                                  borderRight: "2px solid black",
                                  borderRadius: "0 0px 5px 5px"
                                }}
                              >
                                {secContent.itens.map(
                                  (itensContent, itensContentIndex) => (
                                    <Grid
                                      key={`content-itens-${itensContentIndex}`}
                                      container
                                      spacing={1}
                                    >
                                      <Grid
                                        item
                                        xs={12}
                                        sm={0.5}
                                        md={0.5}
                                        lg={0.5}
                                        xl={0.5}
                                      >
                                        <Box
                                          sx={{
                                            width: "100%",
                                            height: "30px",
                                            textAlign: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                          }}
                                        >
                                          {itensContent.position}#
                                        </Box>
                                      </Grid>

                                      <Grid
                                        item
                                        xs={12}
                                        sm={10.5}
                                        md={10.5}
                                        lg={10.5}
                                        xl={10.5}
                                      >
                                        <Box
                                          sx={{
                                            width: "100%",
                                            height: "30px",
                                            display: "flex",
                                            justifyContent: "left",
                                            alignItems: "center"
                                          }}
                                        >
                                          {itensContent.title}
                                        </Box>
                                      </Grid>

                                      <Grid
                                        item
                                        xs={12}
                                        sm={1}
                                        md={1}
                                        lg={1}
                                        xl={1}
                                      >
                                        <Box
                                          sx={{
                                            width: "100%",
                                            height: "30px",
                                            display: "flex",
                                            justifyContent: "space-evenly",
                                            alignItems: "center"
                                          }}
                                        >
                                          <IconButton>
                                            <Icon style={{ fontSize: 14 }}>
                                              sort
                                            </Icon>
                                          </IconButton>
                                          <IconButton>
                                            <Icon style={{ fontSize: 14 }}>
                                              delete
                                            </Icon>
                                          </IconButton>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  )
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </Grid>

              {props.buletim &&
                props.buletim.createdName &&
                props.buletim.createdAt && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="caption">
                      <strong>Criado por: </strong>
                      {props.buletim.createdName}
                      <strong> em: </strong>
                      {new Date(
                        props.buletim.createdAt ? props.buletim.createdAt : ""
                      ).toLocaleDateString()}{" "}
                      {new Date(props.buletim.createdAt).toLocaleTimeString()}
                      {props.buletim.updatedName && props.buletim.updatedAt && (
                        <>
                          <strong> Editado por: </strong>
                          {props.buletim.updatedName}
                          <strong> em: </strong>
                          {new Date(
                            props.buletim.updatedAt
                          ).toLocaleDateString()}{" "}
                          {new Date(
                            props.buletim.updatedAt
                          ).toLocaleTimeString()}
                        </>
                      )}
                    </Typography>
                  </Grid>
                )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Button color="warning" variant="contained" endIcon={<ArrowBack />}>
              voltar
            </Button>

            <Button color="error" variant="contained" endIcon={<Delete />}>
              excluir
            </Button>

            <Button variant="contained" endIcon={<Save />}>
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>

      <ModalSectionContent
        open={sectionContentModal}
        title={addSectionName}
        close={() => {
          setSectionContentModal(false)
        }}
      />
    </PanelFrame>
  )
}

export default BoletimContent
