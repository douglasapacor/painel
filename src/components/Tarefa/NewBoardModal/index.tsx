// import management from "@/config/actions/management"
import { useContextMaster } from "@/context/Master"
import fetchApi from "@/lib/fetch"
import { Close } from "@mui/icons-material"
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  ListItem,
  Modal,
  Paper,
  Snackbar,
  TextField
} from "@mui/material"
import { FC, useEffect, useState } from "react"

type newBoardModal = {
  open: boolean
  name: string
  users: optionsItem[]
  setName: (value: string) => void
  close: (value: boolean) => void
  setUser: (value: optionsItem) => void
  deleteUSer: (id: number) => void
}

type optionsItem = { id: number; name: string; photo: string }

const NewBoardModal: FC<newBoardModal> = props => {
  const [value, setValue] = useState<optionsItem | null>(null)
  const [options, setOptions] = useState<optionsItem[]>([])
  const [inputValue, setInputValue] = useState("")
  const [showSnack, setShowSnack] = useState(false)
  const [snackMsg, setSnackMsg] = useState("")
  const ctx = useContextMaster()

  const feedOptions = async () => {
    try {
      const result = await fetchApi.get(
        "",
        // management.board.findMembers(inputValue),
        ctx.isAuthenticated && ctx.data ? ctx.data.credential : ""
      )

      if (!result.success) throw new Error(result.message)

      setOptions(result.data)
    } catch (error: any) {
      setSnackMsg(error.message)
      setShowSnack(true)
    }
  }

  useEffect(() => {
    feedOptions()
  }, [inputValue])

  return (
    <Modal open={props.open}>
      <>
        <Paper
          sx={{
            p: 2,
            width: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
              <TextField
                fullWidth
                id="nameBoardID"
                variant="outlined"
                value={props.name}
                label="nome"
                onChange={e => {
                  props.setName(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <IconButton
                  onClick={() => {
                    props.close(false)
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Autocomplete
                fullWidth
                getOptionLabel={option => option.name}
                filterOptions={x => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                noOptionsText="Nenhum usuário encontrado"
                onChange={(_: any, newValue: optionsItem | null) => {
                  setOptions(newValue ? [newValue, ...options] : options)
                  setValue(newValue)

                  if (newValue) props.setUser(newValue)
                }}
                onInputChange={(_, newInputValue) => {
                  setInputValue(newInputValue)
                }}
                renderInput={params => (
                  <TextField {...params} label="Selecione os Participantes" />
                )}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props

                  return (
                    <Box key={key} component="li" {...optionProps}>
                      <Avatar
                        sx={{ width: 24, height: 24, mr: 1 }}
                        src={option.photo}
                      />
                      {option.name}
                    </Box>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  bgcolor: "#EEEEEE",
                  p: 1,
                  m: 0
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    Participantes
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container spacing={2}>
                      {props.users &&
                        props.users.map((us, i) => (
                          <ListItem key={`users-id-${us.id}-key-${i}`}>
                            <Chip
                              label={us.name}
                              avatar={<Avatar alt={us.name} src={us.photo} />}
                              onDelete={() => {
                                props.deleteUSer(us.id)
                              }}
                            />
                          </ListItem>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button fullWidth variant="contained">
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Snackbar
          open={showSnack}
          autoHideDuration={6000}
          onClose={() => {
            setShowSnack(false)
          }}
          message={snackMsg}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                setShowSnack(false)
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        />
      </>
    </Modal>
  )
}

export default NewBoardModal
