import { Box } from '@mui/material'
import ListColumn from './ListColumns/ListColumn'
import { mapOrder } from '~/utils/sort'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

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
      <ListColumn columns={orderedColumns} />
    </Box>
  )
}

export default BoardContent
