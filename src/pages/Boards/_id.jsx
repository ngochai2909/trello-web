//Board details
import { Container } from '@mui/material'
import AppBar from '../../components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
import { useEffect } from 'react'
import {
  moveCardToOtherColumnApi,
  updateBoardDetailApi,
  updateColumnDetailApi
} from '../../apis'
import { cloneDeep } from 'lodash'
import {
  fetchBoardDetailApi,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '../../redux/activeBoard/activeBoardSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import { selectActiveCard } from '~/redux/activeCard/activeCardSlice'
function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const activeCard = useSelector(selectActiveCard)

  const { boardId } = useParams()

  useEffect(() => {
    dispatch(fetchBoardDetailApi(boardId))
  }, [dispatch, boardId])

  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((column) => column._id)
    const newBoard = {
      ...board
    }

    newBoard.columnOrderIds = dndOrderedColumnIds
    newBoard.columns = dndOrderedColumns
    dispatch(updateCurrentActiveBoard(newBoard))

    updateBoardDetailApi(newBoard._id, {
      columnOrderIds: dndOrderedColumnIds
    })
  }

  const moveCardInColumn = (dndOrderCards, dndOrderCardIds, columnId) => {
    const newBoard = cloneDeep(board)

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
    dispatch(updateCurrentActiveBoard(newBoard))

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

  if (!board) {
    return <PageLoadingSpinner caption='Loading board...' />
  }
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ height: '100vh', backgroundColor: 'primary.main' }}
    >
      {activeCard && <ActiveCard />}
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        moveColumn={moveColumn}
        moveCardInColumn={moveCardInColumn}
        moveCardToOtherColumn={moveCardToOtherColumn}
      />
    </Container>
  )
}

export default Board
