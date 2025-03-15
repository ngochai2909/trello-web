import { Box } from '@mui/material'
import ListColumn from './ListColumns/ListColumn'

function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex'
      }}
    >
      <ListColumn />
    </Box>
  )
}

export default BoardContent
