import {
  cardContentStyle,
  CssSelect,
  CssTextField
} from "@/styles/objects/cardContentStyle"
import Editor from "@/components/Editor"
import { AttachFile, Close, Send } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Stack,
  Typography
} from "@mui/material"
import { FC, useState } from "react"

const CardDetails: FC<{
  open: boolean
  onClose: (value: boolean) => void
  textContent: string
  setTextContent: (content: string) => void
}> = props => {
  const [editingText, setEditingText] = useState(false)
  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.onClose(false)
      }}
    >
      <Box sx={cardContentStyle}>
        <Grid container spacing={2}>
          <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
            <CssTextField
              fullWidth
              label="Título"
              InputProps={{ style: { color: "white" } }}
              variant="standard"
            />
          </Grid>

          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <IconButton
                onClick={() => {
                  props.onClose(false)
                }}
              >
                <Close sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {editingText ? (
                  <Editor
                    callBackSave={(contents: string, isChanged: boolean) => {
                      if (isChanged) {
                        props.setTextContent(contents)
                      }
                      setEditingText(false)
                    }}
                    width="100%"
                    height="440px"
                    content={props.textContent}
                    onChange={(content: string) => {
                      props.setTextContent(content)
                    }}
                  />
                ) : (
                  <Paper
                    sx={{
                      width: "100%",
                      height: "580px",
                      background: "#212121",
                      color: "white",
                      p: 1
                    }}
                  >
                    <div
                      style={{ width: "100%", height: "100%" }}
                      dangerouslySetInnerHTML={{ __html: props.textContent }}
                    />
                  </Paper>
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  {!editingText ? (
                    <Button
                      onClick={() => {
                        setEditingText(true)
                      }}
                    >
                      editar
                    </Button>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <Button>salvar</Button>
                      <Button
                        onClick={() => {
                          setEditingText(false)
                        }}
                      >
                        cancelar
                      </Button>
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    width: "100%",
                    height: "73px",
                    background: "#424242",
                    border: "1px solid white",
                    borderRadius: 1,
                    p: 1,
                    overflowY: "hidden",
                    overflowX: "scroll",
                    "&::-webkit-scrollbar": {
                      height: "8px"
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#424242"
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#212121",
                      backgroundClip: "padding-box",
                      borderRadius: "10px",
                      border: "2px solid transparent"
                    }
                  }}
                >
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label="asdasd"
                      onDelete={() => {
                        console.log("asdasdasd")
                      }}
                    />
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <IconButton>
                    <AttachFile sx={{ color: "white" }} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: "white",
                      "&.Mui-focused": { color: "white" }
                    }}
                  >
                    Coluna
                  </InputLabel>
                  <CssSelect
                    variant="outlined"
                    fullWidth
                    labelId="columnSelect"
                    label="Coluna"
                    value={1}
                    onChange={e => {}}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: "#212121",
                          color: "white"
                        }
                      }
                    }}
                  >
                    <MenuItem value={1}>Coluna</MenuItem>
                    <MenuItem value={2}>Coluna2</MenuItem>
                  </CssSelect>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: "white",
                      "&.Mui-focused": { color: "white" }
                    }}
                    id="stateSelect"
                  >
                    Status
                  </InputLabel>
                  <CssSelect
                    fullWidth
                    variant="outlined"
                    labelId="stateSelect"
                    label="Status"
                    onChange={e => {}}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: "#212121",
                          color: "white"
                        }
                      }
                    }}
                  >
                    <MenuItem value={undefined}>Status</MenuItem>
                  </CssSelect>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: "white",
                      "&.Mui-focused": { color: "white" }
                    }}
                    id="participantes-id-select"
                  >
                    Participantes
                  </InputLabel>
                  <CssSelect
                    labelId="participantes-id-select"
                    multiple
                    value={[]}
                    input={
                      <OutlinedInput
                        id="select-multiple-participantes-chip"
                        label="Participantes"
                      />
                    }
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: "#212121",
                          color: "white"
                        }
                      }
                    }}
                    renderValue={(selected: any) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value: any) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value={"asd"}>sddasdasd</MenuItem>
                  </CssSelect>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: "white",
                      "&.Mui-focused": { color: "white" }
                    }}
                    id="dep-id-select"
                  >
                    Dependencias
                  </InputLabel>
                  <CssSelect
                    labelId="dep-id-select"
                    multiple
                    value={[]}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Dependencias"
                      />
                    }
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: "#212121",
                          color: "white"
                        }
                      }
                    }}
                    renderValue={(selected: any) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value: any) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value={"asd"}>sddasdasd</MenuItem>
                  </CssSelect>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="caption" sx={{ marginLeft: 1 }}>
                  Atividades:
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl fullWidth>
                  <CssTextField
                    multiline
                    maxRows={3}
                    placeholder="Adicione um comentário"
                    InputProps={{
                      style: { color: "white" },
                      endAdornment: (
                        <IconButton>
                          <Send sx={{ color: "white" }} />
                        </IconButton>
                      )
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 306,
                    background: "#212121",
                    borderRadius: 1,
                    p: 1,
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                      width: "8px"
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#212121"
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#424242",
                      backgroundClip: "padding-box",
                      borderRadius: "10px",
                      border: "2px solid transparent"
                    }
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%"
                        }}
                      >
                        <Avatar sx={{ width: 28, height: 28 }} />
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          height: "100%",
                          pl: 1
                        }}
                      >
                        <Typography variant="caption">
                          asdasdasdasds asdasdasdasds asdasdasdasds
                          asdasdasdasds asdasdasdasds asdasdasdasds
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default CardDetails
