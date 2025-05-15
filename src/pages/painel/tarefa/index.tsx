import {
  Avatar,
  Box,
  Button,
  Fab,
  Grid,
  Modal,
  IconButton
} from "@mui/material"
import { NewBoardModal, PanelFrame } from "@/components"
import { Add } from "@mui/icons-material"
import { NextPage } from "next"
import { useState } from "react"

const Boards: NextPage = () => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  const [boardName, setBoardName] = useState("")
  const [boardMembers, setBoardMembers] = useState<
    {
      id: number
      name: string
      photo: string
    }[]
  >([])
  const [showNewBoard, setShowNewBoard] = useState(false)

  const openNewModal = () => {
    setShowNewBoard(true)
  }

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Quadros de tarefas"
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/tarefa",
          iconName: "dashboard",
          text: "Tarefas"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
      outsideContent={
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Fab color="primary" aria-label="add" onClick={openNewModal}>
            <Add />
          </Fab>
        </Box>
      }
      dense
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          {/* <Board color="#4CAF50" /> */}
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          {/* <Board color="#4CAF50" /> */}
        </Grid>
      </Grid>

      <NewBoardModal
        open={showNewBoard}
        name={boardName}
        close={e => {
          setShowNewBoard(e)
        }}
        setName={e => {
          setBoardName(e)
        }}
        users={boardMembers}
        setUser={value => {
          const temp = [...boardMembers]
          temp.push(value)
          setBoardMembers(temp)
        }}
        deleteUSer={(id: number) => {
          const tmp = [...boardMembers]
          const index = tmp.findIndex(i => i.id === id)
          const treated = tmp.slice(index, 1)
          setBoardMembers(treated)
        }}
      />
    </PanelFrame>
  )
}

export default Boards
