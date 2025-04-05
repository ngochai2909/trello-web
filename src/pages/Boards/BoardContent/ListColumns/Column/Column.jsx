import React, { useState } from 'react'
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material'
import { Menu, MenuItem } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import { ContentCopy, ContentPaste, Opacity } from '@mui/icons-material'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCard from './ListCards/ListCard'
import { mapOrder } from '~/utils/sort'
import CloseIcon from '@mui/icons-material/Close'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'

function Column({ column }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  const [openNewCard, setOpenNewCard] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const toggleNewCard = () => {
    setOpenNewCard(!openNewCard)
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error('Please enter a card name', {
        position: 'bottom-right'
      })
      return
    }
    toggleNewCard()
    setNewCardTitle('')
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column._id, data: { ...column } })

  const dndKitColumnStyle = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }
  return (
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: 300,
          maxWidth: 300,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
          overflowX: 'auto',
          overflowY: 'hidden'
        }}
      >
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More Options'>
              <ExpandMoreIcon
                sx={{
                  color: 'text.primary',
                  cursor: 'pointer'
                }}
                id='basic-column-dropdown'
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id='basic-column-dropdown'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize='small' />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize='small' />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize='small' />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize='small' />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <ListCard cards={orderedCards} />
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2
          }}
        >
          {!openNewCard ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <Button onClick={toggleNewCard} startIcon={<AddCardIcon />}>
                Add new card
              </Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon
                  sx={{
                    cursor: 'pointer'
                  }}
                />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <TextField
                label='Enter Column Name...'
                type='text'
                size='small'
                variant='outlined'
                data-no-dnd='true'
                autoFocus
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  '&-label': { color: 'text.primary' },
                  '&-input': {
                    color: (theme) => theme.palette.text.primary,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#333643' : 'white'
                  },
                  '& label.Mui-focused': {
                    color: (theme) => theme.palette.text.primary.main
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      bordercColor: (theme) => theme.palette.text.primary.main
                    },
                    '& hover fieldset': {
                      borderColor: (theme) => theme.palette.text.primary.main
                    },
                    '& .MuiOutlinedInput-input': {
                      borderRadius: 1
                    }
                  }
                }}
              />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Button
                  variant='contained'
                  data-no-dnd='true'
                  color='success'
                  size='small'
                  onClick={addNewCard}
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid ',
                    borderColor: (theme) => theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.primary.main
                    }
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  sx={{
                    cursor: 'pointer',

                    color: (theme) => theme.palette.warning.light
                  }}
                  onClick={() => {
                    toggleNewCard()
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column
