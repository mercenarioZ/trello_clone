// Board details
import Container from "@mui/material/Container";
import React, { Fragment } from "react";
import {
  fetchBoardDetailAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailAPI,
} from "~/apis";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utilities/formatters";

const Board = () => {
  const [board, setBoard] = React.useState(null);

  React.useEffect(() => {
    const boardId = "655623ad0200bcdda149a115";

    // Call API to get board details
    fetchBoardDetailAPI(boardId).then((response) => {
      // Add placeholder column to board to fix the drag and drop bug
      response.columns.forEach((column) => {
        // check if column has no cards
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        }
      });
      // console.log(response)
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

  // Call API to update the column order
  const moveColumn = async (dndOrderedColumn) => {
    const afterMovingColumnOrderIds = dndOrderedColumn.map(col => col._id)
    
    // update board before calling API
    const updatedBoard = { ...board };
    updatedBoard.columns = dndOrderedColumn;
    updatedBoard.columnOrderIds = afterMovingColumnOrderIds;
    setBoard(updatedBoard);

    // Call API for updating column order in database
    await updateBoardDetailAPI(board._id, { columnOrderIds: afterMovingColumnOrderIds })
  };

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
        />
      </Container>
    </Fragment>
  );
};

export default Board;
