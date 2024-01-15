// Board details
import { Box, CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import { isEmpty } from "lodash";
import React, { Fragment } from "react";
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailAPI,
  moveCardToAnotherColumnAPI,
  updateBoardDetailAPI,
  updateColumnAPI,
} from "~/apis";
import AppBar from "~/components/AppBar/AppBar";
import { generatePlaceholderCard } from "~/utilities/formatters";
import { mapOrder } from "~/utilities/sorts";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

const Board = () => {
  const [board, setBoard] = React.useState(null);

  React.useEffect(() => {
    const boardId = "655623ad0200bcdda149a115";

    // Call API to get board details
    fetchBoardDetailAPI(boardId).then((response) => {
      response.columns = mapOrder(
        response.columns,
        response.columnOrderIds,
        "_id"
      );

      // Add placeholder column to board to fix the drag and drop bug
      response.columns.forEach((column) => {
        // check if column has no cards
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });

      setBoard(response);
    });
  }, []);

  // Call API and update board state
  const createNewColumn = async (newColumnData) => {
    // response will be the new column
    const response = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    // Add placeholder card to column to fix the drag and drop bug
    response.cards = [generatePlaceholderCard(response)];
    response.cardOrderIds = [generatePlaceholderCard(response)._id];

    // Update board state
    const updatedBoard = { ...board };
    updatedBoard.columns.push(response);
    updatedBoard.columnOrderIds.push(response._id);
    setBoard(updatedBoard);
  };

  const createNewCard = async (newCardData) => {
    const response = await createNewCardAPI({
      boardId: board._id,
      ...newCardData,
    });

    // update board state
    const updatedBoard = { ...board };
    const updatedColumn = updatedBoard.columns.find(
      (col) => col._id === response.columnId
    );

    if (updatedColumn) {
      updatedColumn.cards.push(response);
      updatedColumn.cardOrderIds.push(response._id);
      setBoard(updatedBoard);
    }
  };

  // Call API to update the column order (columnOrderIds array)
  const moveColumn = (orderedColumns) => {
    const afterMovingColumnOrderIds = orderedColumns.map((col) => col._id);

    // update board before calling API
    const updatedBoard = { ...board };
    updatedBoard.columns = orderedColumns;
    updatedBoard.columnOrderIds = afterMovingColumnOrderIds;
    setBoard(updatedBoard);

    // Call API for updating column order in database
    updateBoardDetailAPI(board._id, {
      columnOrderIds: afterMovingColumnOrderIds,
    });
  };

  // Function handle moving card in the same column
  const moveCardInSameColumn = (orderedCards, orderedCardIds, columnId) => {
    // update board UI before calling API
    const updatedBoard = { ...board };
    const updatedColumn = updatedBoard.columns.find(
      (column) => column._id === columnId
    );

    if (updatedColumn) {
      updatedColumn.cards = orderedCards;
      updatedColumn.cardOrderIds = orderedCardIds;
    }

    setBoard(updatedBoard);

    // Call API for updating card order in database
    updateColumnAPI(columnId, { cardOrderIds: orderedCardIds });
  };

  /**
   * Function handle moving card to another column
   *
   * `Step 1`: Remove card from the current column by updating the `cardOrderIds` array in the current column
   *
   * `Step 2`: Add card to the new column by updating the `cardOrderIds` array in the new column
   *
   * `Step 3`: Update the `columnId` field of the dragged card
   */
  const moveCardToAnotherColumn = (
    currentCardId,
    currentColumnId,
    nextColumnId,
    orderedColumns
  ) => {
    // update board UI before calling API
    const orderedColumnIds = orderedColumns.map((col) => col._id);
    const updatedBoard = { ...board };

    updatedBoard.columns = orderedColumns;
    updatedBoard.columnOrderIds = orderedColumnIds;
    setBoard(updatedBoard);

    // API calling
    let currentCardOrderIds = orderedColumns.find(
      (col) => col._id === currentColumnId
    )?.cardOrderIds;

    // Send empty array to server if the current column has no cards. Because server will throw error if we send the array with only placeholder card (not pass the validation)
    if (currentCardOrderIds[0].includes("placeholder")) {
      currentCardOrderIds = [];
    }

    moveCardToAnotherColumnAPI({
      currentCardId,
      currentColumnId,
      currentCardOrderIds,
      nextColumnId,
      nextCardOrderIds: orderedColumns.find(
        (column) => column._id === nextColumnId
      )?.cardOrderIds,
    });
  };

  // Create a loading screen while waiting for board data
  if (!board) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: 2,
        }}
      >
        <CircularProgress />
        <h4>Loading... Sit down and have a cup of tea</h4>
      </Box>
    );
  }

  return (
    <Fragment>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          height: "100vh",
        }}
      >
        <AppBar />

        <BoardBar board={board} />

        <BoardContent
          moveColumn={moveColumn}
          createNewCard={createNewCard}
          board={board}
          createNewColumn={createNewColumn}
          moveCardInSameColumn={moveCardInSameColumn}
          moveCardToAnotherColumn={moveCardToAnotherColumn}
        />
      </Container>
    </Fragment>
  );
};

export default Board;
