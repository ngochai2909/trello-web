import { Box, Button, TextField } from '@mui/material'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import CloseIcon from '@mui/icons-material/Close'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'

function ListColumn({ columns }) {
  const [openNewColumn, setOpenNewColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const toggleNewColumn = () => {
    setOpenNewColumn(!openNewColumn)
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      return
    }
    toggleNewColumn()
    setNewColumnTitle('')
  }

  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}
      >
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        {!openNewColumn ? (
          <Box
            sx={{
              minWidth: 250,
              maxWidth: 250,
              mx: 2,
              borderRadius: '6px',
              bgcolor: '#ffffff3d',
              height: 'fit-content'
            }}
          >
            <Button
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
              onClick={toggleNewColumn}
              startIcon={<NoteAddIcon />}
            >
              Add New Column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              bgcolor: '#ffffff3d',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label='Enter Column Name...'
              type='text'
              size='small'
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': {
                  color: 'white'
                },
                '& input': {
                  color: 'white'
                },
                '& label.Mui-focused': {
                  color: 'white'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white'
                  },
                  '&:hover fieldset': {
                    borderColor: 'white'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white'
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button
                variant='contained'
                color='success'
                size='small'
                onClick={addNewColumn}
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid ',
                  borderColor: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.primary.main
                  }
                }}
              >
                Add New Column
              </Button>
              <CloseIcon
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    color: (theme) => theme.palette.primary.main
                  }
                }}
                onClick={() => {
                  toggleNewColumn()
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumn
