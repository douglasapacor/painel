import { Avatar, Box, Tooltip, Typography } from "@mui/material"
import { FC } from "react"

type memberType = { id: number; photo: string; nome: string }
type TaskMembers = {
  members: memberType[]
}

const Members: FC<TaskMembers> = props => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        p: 2,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "end",
        background: theme => theme.palette.primary.main
      }}
    >
      <Typography variant="body1" sx={{ marginRight: 1, color: "white" }}>
        integrantes:
      </Typography>
      {props.members.map((part, index) => (
        <Tooltip key={`participant-number-${index}`} title={part.nome}>
          <Avatar sx={{ width: 24, height: 24 }} src={part.photo} />
        </Tooltip>
      ))}
    </Box>
  )
}

export default Members
