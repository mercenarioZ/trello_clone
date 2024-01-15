/* eslint-disable react/prop-types */
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
// import { MouseSensor, TouchSensor } from "~/customs/dndKitSensors";
import { arrayMove } from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import { cloneDeep, isEmpty } from "lodash";
import React, { useRef } from "react";
import { generatePlaceholderCard } from "~/utilities/formatters";
import Col from "./ListCols/Col/Column";
import Card from "./ListCols/Col/ListCards/Card/Card";
import ListCols from "./ListCols/ListColumns";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = ({
  board,
  createNewColumn,
  createNewCard,
  moveColumn,
  moveCardInSameColumn,
  moveCardToAnotherColumn,
}) => {
  // Require the mouse to move by 10 pixels before activating the pointer event (drag)
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  // Tap and hold for 250ms before activating the touch event (drag), and allow a 5px shift before cancelling the event
  const touchSensor = useSensor(TouchSensor, {
    // delay by 250ms which means that the user has to hold the element for 250ms before it can be dragged
    // tolerance means that the user can move their finger up to 30px before the drag is cancelled
    activationConstraint: { delay: 250, tolerance: 30 },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = React.useState([]);

  // There is only one active drag item at a time (either a column or a card)
  const [activeDragItemId, setActiveDragItemId] = React.useState(null);
  const [activeDragItemType, setActiveDragItemType] = React.useState(null);
  const [activeDragItemData, setActiveDragItemData] = React.useState(null);
  const [oldColumnWhenDragStart, setOldColumnWhenDragStart] =
    React.useState(null);

  // Last collision point
  const lastOverId = useRef(null);

  React.useEffect(() => {
    setOrderedColumns(board.columns);
  }, [board]);

  // This function returns the column (id of that column) that contains the card with the given cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };

  // Update the column order when dragging a card to another column
  const handleMoveCardBetweenColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeCardId,
    activeCardData,
    triggerFrom
  ) => {
    setOrderedColumns((previousColumns) => {
      // Find the index of the overCard (the card that is being dropped over)
      const overCardIndex = overColumn.cards.findIndex(
        (card) => card._id === overCardId
      );

      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      // Why do we need to clone the previous columns? In React (and other frameworks), mutating the state directly is not recommended (or not allowed). Mutating the state directly can cause some unexpected bugs. So we need to clone the previous columns, make the changes and then return the new columns
      const nextColumns = cloneDeep(previousColumns);
      const nextActiveColumn = nextColumns.find(
        (col) => col._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find(
        (col) => col._id === overColumn._id
      );

      if (nextActiveColumn) {
        // Remove the card from the active column
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeCardId
        );

        // Add the placeholder card if all the cards are removed from the column
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }

        // Update the cardOrderIds array
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }

      if (nextOverColumn) {
        // Add the card to the over column
        // When dragging a card to another column, we need to change the columnId of that card
        nextOverColumn.cards.splice(newCardIndex, 0, {
          ...activeCardData,
          columnId: nextOverColumn._id,
        });

        // Remove the placeholder card when the column has at least one card
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.Frontend_PlaceholderCard
        );

        // Update the cardOrderIds array
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }

      // Just call API when the trigger is handleDragEnd
      if (triggerFrom === "handleDragEnd") {
        moveCardToAnotherColumn(
          activeCardId,
          oldColumnWhenDragStart._id,
          nextOverColumn._id,
          nextColumns
        );
      }

      return nextColumns;
    });
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);

    // set the current column/card type
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    // set the current column/card data
    setActiveDragItemData(event?.active?.data?.current);

    // Check if the active drag item is a card. Because just only when dragging a card, we do have the `columnId` in the data
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDragStart(findColumnByCardId(event?.active?.id));
    }
  };

  // This function is called when the dragged item is over another item
  const handleDragOver = (event) => {
    const { active, over } = event;

    // If the active drag item is a column, return. That means we are done, we won't do anything else when dragging a column over something...
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    if (!active || !over) return; // If there is no active or over item, return

    // console.log('handleDragOver: ', event)

    const {
      id: activeCardId,
      data: { current: activeCardData },
    } = active;
    const { id: overCardId } = over;

    // Find the column by the active card id
    const activeColumn = findColumnByCardId(activeCardId);
    const overColumn = findColumnByCardId(overCardId);

    // If one of those columns is not found, return
    if (!activeColumn || !overColumn) return;

    // Handle the case when the active card is dragged over another column
    if (activeColumn._id !== overColumn._id) {
      handleMoveCardBetweenColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeCardId,
        activeCardData,
        "handleDragOver"
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // If there is no over column (dragging out of the board), return
    if (!over || !active) return;

    // Handle the case when dragging card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeCardId,
        data: { current: activeCardData },
      } = active;
      const { id: overCardId } = over;

      // Find the column by the active card id
      const activeColumn = findColumnByCardId(activeCardId);
      const overColumn = findColumnByCardId(overCardId);

      // If activeColumn or overColumn is not found, return
      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDragStart._id !== overColumn._id) {
        // Dragging card to another column
        handleMoveCardBetweenColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeCardId,
          activeCardData,
          "handleDragEnd"
        );
      } else {
        // Dragging card within the same column
        // Take the old column index (from oldColumnWhenDragStart)
        const oldCardIndex = oldColumnWhenDragStart?.cards.findIndex(
          (col) => col._id === activeDragItemId
        );

        // Take the new column index (from overColumn)
        const newCardIndex = overColumn?.cards.findIndex(
          (col) => col._id === overCardId
        );

        console.log("oldCardIndexInSameCol: ", oldCardIndex);
        console.log("newCardIndexInSameCol: ", newCardIndex);

        // Use arrayMove. Dragging a card within the same column is the same as dragging a column
        const dndOrderedCards = arrayMove(
          oldColumnWhenDragStart?.cards,
          oldCardIndex,
          newCardIndex
        );

        const dndOrderedCardIds = dndOrderedCards.map((card) => card._id);

        setOrderedColumns((previousColumns) => {
          const nextColumns = cloneDeep(previousColumns);

          // Get the column we are dragging the card in
          const columnThatContainsTheCard = nextColumns.find(
            (col) => col._id === overColumn._id
          );

          // Update the cards array
          columnThatContainsTheCard.cards = dndOrderedCards;
          columnThatContainsTheCard.cardOrderIds = dndOrderedCardIds;

          return nextColumns;
        });

        moveCardInSameColumn(
          dndOrderedCards,
          dndOrderedCardIds,
          oldColumnWhenDragStart._id
        );
      }
    }

    // Handle the case when dragging column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // If the over column is not the same as the active column, continue
      if (active.id !== over.id) {
        // Take the old column index (from active.id)
        const oldColumnIndex = orderedColumns.findIndex(
          (col) => col._id === active.id
        );

        // Take the new column index (from over.id)
        const newColumnIndex = orderedColumns.findIndex(
          (col) => col._id === over.id
        );

        // Use arrayMove to change the columns order
        // Columns array after being moved
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );

        // Call the moveColumn function to update the column order in the database
        moveColumn(dndOrderedColumns);

        // Update the state with the new column order. Why do we need this while we already have the new column order in the database above? Because API calls take time, so we need to update the state immediately to make the UI more responsive (Avoid flickering)
        setOrderedColumns(dndOrderedColumns);
      }
    }

    // Reset the active drag item, but why? Because we don't want to keep the active drag item in the state after the drag is done
    setActiveDragItemType(null);
    setActiveDragItemId(null);
    setActiveDragItemData(null);
    setOldColumnWhenDragStart(null);
  };

  // Trigger this when an active drag item is dropped
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: ".7" } },
    }),
  };

  const collisionDetectionStrategy = React.useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }

      const pointerIntersections = pointerWithin(args);

      if (!pointerIntersections?.length) return;

      // Get the first overId in the intersections array
      let overId = getFirstCollision(pointerIntersections, "id");
      // console.log("overId: ", overId)

      // If there is an overId, set the lastOverId to that overId
      if (overId) {
        // Flickering bug fixing
        // if the overId is a column, we will find the nearest cardId into the collision area by using closestCorners or closestCenter
        const checkColumn = orderedColumns.find(
          (column) => column._id === overId
        );

        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkColumn.cardOrderIds.includes(container.id)
                );
              }
            ),
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }

      // If there is no overId, return the empty array, prevent the page from crashing
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns]
  );

  return (
    // Container
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          height: (theme) => theme.projectCustomConst.boardContentHeight,
          width: "100%",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",

          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <ListCols
          createNewCard={createNewCard}
          createNewColumn={createNewColumn}
          columns={orderedColumns}
        />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Col column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;
