import { Box } from '@mui/material'
import Card from './Card/Card'

function ListCard({ cards }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: '0 5px',
        m: '0 5px',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => {
          const totalHeight = `${
            theme.trello.boardContentHeight
          } - ${theme.spacing(5)}`
          return `calc(${totalHeight} - ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight})`
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da',
          borderRadius: '8px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf',

          borderRadius: '8px'
        }
      }}
    >
      {cards?.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </Box>
  )
}

export default ListCard
