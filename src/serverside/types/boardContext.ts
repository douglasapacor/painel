export type participantsType = { id: number; photo: string; nome: string }
export type cardsType = { id: number; name: string }
export type columnsType = { id: number; name: string; cards: cardsType[] }

export type boardContext = {
  id: number
  boardName: string
  participants: participantsType[]
  columns: columnsType[]
}

const constructor = (): boardContext => {
  return {
    id: 0,
    boardName: "tarefas do doido",
    participants: [],
    columns: []
  }
}

export { constructor }
