//Board details
import { Box, CircularProgress, Container } from '@mui/material'
import AppBar from '../../components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
import { useEffect, useState } from 'react'
import { mapOrder } from '../../utils/sort'
import {
  createNewCardApi,
  createNewColumnApi,
  deleteColumnApi,
  fetchBoardDetailApi,
  moveCardToOtherColumnApi,
  updateBoardDetailApi,
  updateColumnDetailApi
} from '../../apis'
import { generatePlaceholderCard } from '../../utils/formatter'
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)
  const boardId = '67eeca3e644244f0269745f1'

  useEffect(() => {
    fetchBoardDetailApi(boardId).then((board) => {
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = {
      ...board
    }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id
    })

    const newBoard = {
      ...board
    }
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
    setBoard(newBoard)
  }

  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((column) => column._id)
    const newBoard = {
      ...board
    }

    newBoard.columnOrderIds = dndOrderedColumnIds
    newBoard.columns = dndOrderedColumns
    setBoard(newBoard)

    updateBoardDetailApi(newBoard._id, {
      columnOrderIds: dndOrderedColumnIds
    })
  }

  const moveCardInColumn = (dndOrderCards, dndOrderCardIds, columnId) => {
    const newBoard = {
      ...board
    }
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderCards
      columnToUpdate.cardOrderIds = dndOrderCardIds
    }

    updateColumnDetailApi(columnId, {
      cardOrderIds: dndOrderCardIds
    })
  }

  const moveCardToOtherColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((column) => column._id)
    const newBoard = {
      ...board
    }

    newBoard.columnOrderIds = dndOrderedColumnIds
    newBoard.columns = dndOrderedColumns
    setBoard(newBoard)

    let prevCardOrderIds = newBoard.columns.find(
      (column) => column._id === prevColumnId
    )?.cardOrderIds

    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }

    moveCardToOtherColumnApi({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: newBoard.columns.find(
        (column) => column._id === nextColumnId
      )?.cardOrderIds
    })
  }

  const handleDeleteColumn = (columnId) => {
    const newBoard = {
      ...board
    }

    newBoard.columns = newBoard.columns.filter(
      (column) => column._id !== columnId
    )
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (id) => id !== columnId
    )
    setBoard(newBoard)

    deleteColumnApi(columnId)
      .then((res) => {
        toast.success(res?.message)
      })
      .catch(() => {
        toast.error('Failed to delete column')
      })
  }

  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress size={100} />
      </Box>
    )
  }
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ height: '100vh', backgroundColor: 'primary.main' }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createdNewColumn={createNewColumn}
        createdNewCard={createNewCard}
        moveColumn={moveColumn}
        moveCardInColumn={moveCardInColumn}
        moveCardToOtherColumn={moveCardToOtherColumn}
        handleDeleteColumn={handleDeleteColumn}
      />
    </Container>
  )
}

export default Board
