import { CardDetails, Columns, Members, PanelFrame } from "@/components"
import Editor from "@/components/Editor"
import {
  cardContentStyle,
  CssSelect,
  CssTextField
} from "@/styles/objects/cardContentStyle"
import { serverSide } from "@/helpers/serverside/boardContext"
import { boardContext } from "@/serverside/types/boardContext"
import { Add, ArrowBack, AttachFile, Close, Send } from "@mui/icons-material"
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
import { GetServerSideProps, NextPage } from "next"
import { useState } from "react"

export const getServerSideProps: GetServerSideProps<
  boardContext
> = async context => {
  return serverSide(context)
}

const BoardContent: NextPage<boardContext> = ({ ...props }) => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [cardModal, setCardModal] = useState(true)

  const [boardContent] = useState<boardContext>(props)
  const [textContent, setTextContent] = useState("")

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title={boardContent.boardName}
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
        },
        {
          href: "/painel/tarefa/board/sadasdasdad",
          iconName: "space_dashboard",
          text: "nome do quadro"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
      outsideContent={
        <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <Button variant="contained" startIcon={<ArrowBack />}>
            voltar
          </Button>
        </Box>
      }
      dense
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Members members={boardContent.participants} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="TaskContainer">
            {props.columns.map((cloumn, cIndex) => (
              <Columns
                key={`column-id-${cloumn.id}-key-${cIndex}`}
                id={cloumn.id}
                name={cloumn.name}
                cards={cloumn.cards}
              />
            ))}

            <div id="TaskColumnAdd">
              <Button
                sx={{ color: "white" }}
                variant="text"
                fullWidth
                startIcon={<Add />}
              >
                Adicionar Lista
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>

      <CardDetails
        open={cardModal}
        onClose={value => {
          setCardModal(value)
        }}
        textContent={textContent}
        setTextContent={(content: string) => {
          setTextContent(content)
        }}
      />
    </PanelFrame>
  )
}

export default BoardContent
