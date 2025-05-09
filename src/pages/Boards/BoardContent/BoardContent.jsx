import { Box } from '@mui/material'
import ListColumn from './ListColumns/ListColumn'
import {
  DndContext,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '../../../utils/formatter'
import { MouseSensor, TouchSensor } from '../../../customLibs/dndKitSensor'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({
  board,
  moveColumn,
  moveCardInColumn,
  moveCardToOtherColumn
}) {
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10
  //   }
  // })
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
  const lastOverId = useRef(null)

  useEffect(() => {
    const orderedColumns = board.columns
    setOrderedColumns(orderedColumns)
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id).includes(cardId)
    )
  }

  const moveCardBetweenColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerCard
  ) => {
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
          (card) => card._id !== activeDraggingCardId
        )

        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        )
      }
      if (nextOverColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          activeDraggingCardData
        )
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_placeholderCard
        )

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        )
      }
      if (triggerCard === 'handleDragEnd') {
        moveCardToOtherColumn(
          activeDraggingCardId,
          oldColumnData._id,
          nextOverColumn._id,
          nextColumn
        )
      }

      return nextColumn
    })
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
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return

      if (oldColumnData._id !== overColumn._id) {
        moveCardBetweenColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )
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

        const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id)

        setOrderedColumns((prevColumn) => {
          const nextColumn = cloneDeep(prevColumn)
          const targetColumn = nextColumn.find((c) => c._id === overColumn._id)
          targetColumn.cards = dndOrderedColumns
          targetColumn.cardOrderIds = dndOrderedColumnIds
          return nextColumn
        })
        moveCardInColumn(
          dndOrderedColumns,
          dndOrderedColumnIds,
          oldColumnData._id
        )
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
        moveColumn(dndOrderedColumns)
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

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      const pointerIntersection = pointerWithin(args)

      if (!pointerIntersection?.length) return

      // const intersection =
      //   pointerIntersection?.length > 0
      //     ? pointerIntersection
      //     : rectIntersection(args)

      let overId = getFirstCollision(pointerIntersection, 'id')
      if (overId) {
        const checkColumn = orderedColumns.find(
          (column) => column._id === overId
        )
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id === overId &&
                checkColumn?.cardOrderIds?.includes(container.id)
            )
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeDragItemType]
  )

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
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
