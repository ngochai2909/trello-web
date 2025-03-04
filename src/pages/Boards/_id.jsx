//Board details
import { Container } from '@mui/material'
import AppBar from '../../components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

function Board() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ height: '100vh', backgroundColor: 'primary.main' }}
    >
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
