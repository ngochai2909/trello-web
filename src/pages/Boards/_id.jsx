//Board details
import { Container } from '@mui/material'
import AppBar from '../../components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
import { useEffect, useState } from 'react'
import { fetchBoardDetailApi } from '../../apis'
import { CatchingPokemon } from '@mui/icons-material'

function Board() {
  const [board, setBoard] = useState(null)
  const boardId = '67eeca3e644244f0269745f1'

  useEffect(() => {
    fetchBoardDetailApi(boardId).then((board) => {
      setBoard(board)
    })
  }, [])

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ height: '100vh', backgroundColor: 'primary.main' }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
