// Board details
import Container from "@mui/material/Container";
import React, { Fragment } from "react";
import {
  fetchBoardDetailAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailAPI,
  updateColumnAPI,
} from "~/apis";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utilities/formatters";
import { mapOrder } from "~/utilities/sorts";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";

const Board = () => {
  const [board, setBoard] = React.useState(null);

  React.useEffect(() => {
    const boardId = "655623ad0200bcdda149a115";

    // Call API to get board details
    fetchBoardDetailAPI(boardId).then((response) => {
      response.columns = mapOrder(response.columns, response.columnOrderIds, "_id");

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
  const moveColumn = (dndOrderedColumn) => {
    const afterMovingColumnOrderIds = dndOrderedColumn.map((col) => col._id);

    // update board before calling API
    const updatedBoard = { ...board };
    updatedBoard.columns = dndOrderedColumn;
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
        />
      </Container>
    </Fragment>
  );
};

export default Board;
