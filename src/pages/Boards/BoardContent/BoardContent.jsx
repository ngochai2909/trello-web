import { Box } from '@mui/material'
import ListColumn from './ListColumns/ListColumn'
import { mapOrder } from '~/utils/sort'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnData, setOldColumnData] = useState(null)

  useEffect(() => {
    const orderedColumns = mapOrder(
      board?.columns,
      board?.columnOrderIds,
      '_id'
    )
    setOrderedColumns(orderedColumns)
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id).includes(cardId)
    )
  }

  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemId(event?.active.id)
    setActiveDragItemType(
      event?.active.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active.data?.current?.columnId) {
      setOldColumnData(findColumnByCardId(event?.active.id))
    }
  }

  const handleDragOver = (event) => {
    // console.log('handleDragOver', event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event

    if (!over || !active) return

    const {
      id: activeDragginCardId,
      data: { current: activeDragginCardData }
    } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDragginCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((prevColumn) => {
        const overCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        )
        let newCardIndex

        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1

        const nextColumn = cloneDeep(prevColumn)

        const nextActiveColumn = nextColumn.find(
          (column) => column._id === activeColumn._id
        )
        const nextOverColumn = nextColumn.find(
          (column) => column._id === overColumn._id
        )

        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDragginCardId
          )
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          )
        }
        if (nextOverColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDragginCardId
          )
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDragginCardData
          )
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card) => card._id
          )
        }

        return nextColumn
      })
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDragginCardId,
        data: { current: activeDragginCardData }
      } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDragginCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return

      if (oldColumnData._id !== overColumn._id) {
      } else {
        const oldCardIndex = oldColumnData?.cards.findIndex(
          (c) => c._id === activeDragItemId
        )
        const newCardIndex = overColumn?.cards.findIndex(
          (c) => c._id === overCardId
        )
        const dndOrderedColumns = arrayMove(
          oldColumnData?.cards,
          oldCardIndex,
          newCardIndex
        )

        setOrderedColumns((prevColumn) => {
          const nextColumn = cloneDeep(prevColumn)
          const targetColumn = nextColumn.find((c) => c._id === overColumn._id)
          targetColumn.cards = dndOrderedColumns
          targetColumn.cardOrderIds = dndOrderedColumns.map((c) => c._id)
          return nextColumn
        })
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        )
        const newColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id
        )
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        )
        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setOldColumnData(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          display: 'flex',
          p: '5px 0'
        }}
      >
        <ListColumn columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
