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
import { ContentCopy, ContentPaste } from '@mui/icons-material'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCard from './ListCards/ListCard'
import CloseIcon from '@mui/icons-material/Close'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'
import { useConfirm } from 'material-ui-confirm'
import {
  createNewCardApi,
  deleteColumnApi,
  updateColumnDetailApi
} from '~/apis'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'

function Column({ column }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const orderedCards = column.cards

  const [openNewCard, setOpenNewCard] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const toggleNewCard = () => {
    setOpenNewCard(!openNewCard)
  }

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please enter a card name', {
        position: 'bottom-right'
      })
      return
    }

    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id
    })

    const newBoard = cloneDeep(board)

    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    )

    if (columnToUpdate) {
      if (columnToUpdate.cards.some((card) => card.FE_placeholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    dispatch(updateCurrentActiveBoard(newBoard))

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

  const confirm = useConfirm()

  const handleDelete = () => {
    confirm({
      title: 'Delete Column',
      description: 'Are you sure you want to delete this column?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      buttonOrder: ['confirm', 'cancel']
    })
      .then(() => {
        const newBoard = {
          ...board
        }

        newBoard.columns = newBoard.columns.filter(
          (col) => col._id !== column._id
        )
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
          (id) => id !== column._id
        )
        dispatch(updateCurrentActiveBoard(newBoard))

        deleteColumnApi(column._id)
          .then((res) => {
            toast.success(res?.message)
          })
          .catch(() => {
            toast.error('Failed to delete column')
          })
      })
      .catch(() => {
        console.log('cancelled')
      })
  }

  const onUpdateTitle = (newTitle) => {
    updateColumnDetailApi(column._id, { title: newTitle })
      .then(() => {
        const newBoard = cloneDeep(board)
        const columnToUpdate = newBoard.columns.find(
          (col) => col._id === column._id
        )
        if (columnToUpdate) {
          columnToUpdate.title = newTitle
        }
        dispatch(updateCurrentActiveBoard(newBoard))

        toast.success('Column title updated successfully')
      })
      .catch(() => {
        toast.error('Failed to update column title')
      })
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
          {/* <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {column?.title}
          </Typography> */}

          <ToggleFocusInput
            value={column?.title}
            onChangedValue={onUpdateTitle}
            data-no-dnd='true'
          />
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
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem
                onClick={toggleNewCard}
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-card-icon': {
                      color: 'success.light'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <AddCardIcon fontSize='small' className='add-card-icon' />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .cut-icon': {
                      color: 'success.light'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <ContentCut fontSize='small' className='cut-icon' />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .copy-icon': {
                      color: 'success.light'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <ContentCopy fontSize='small' className='copy-icon' />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .paste-icon': {
                      color: 'success.light'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <ContentPaste fontSize='small' className='paste-icon' />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'red',
                    '& .delete-icon': {
                      color: 'red'
                    }
                  }
                }}
                onClick={handleDelete}
              >
                <ListItemIcon>
                  <DeleteIcon fontSize='small' className='delete-icon' />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .archive-icon': {
                      color: 'success.light'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <Cloud fontSize='small' className='archive-icon' />
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
                  className='interceptor-loading'
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
