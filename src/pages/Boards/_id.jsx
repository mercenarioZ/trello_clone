// Board details
import Container from "@mui/material/Container";
import React, { Fragment } from "react";
import {
  fetchBoardDetailAPI,
  createNewColumnAPI,
  createNewCardAPI,
} from "~/apis";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

const Board = () => {
  const [board, setBoard] = React.useState(null);

  React.useEffect(() => {
    const boardId = "655623ad0200bcdda149a115";

    // Call API to get board details
    fetchBoardDetailAPI(boardId).then((response) => {
      setBoard(response);
    });
  }, []);

  // Call API and update board state
  const createNewColumn = async (newColumnData) => {
    // response will be the new column
    const res = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    // Update board state
    const updatedBoard = { ...board };
    updatedBoard.columns.push(res);
    updatedBoard.columnOrderIds.push(res._id)
    setBoard(updatedBoard);
  };

  const createNewCard = async (newCardData) => {
    const res = await createNewCardAPI({
      boardId: board._id,
      ...newCardData,
    });

    // update board state
    const updatedBoard = { ...board };
    const updatedColumn = updatedBoard.columns.find(col => col._id === res.columnId)

    if (updatedColumn) {
      updatedColumn.cards.push(res);
      setBoard(updatedBoard);
    }
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
          createNewCard={createNewCard}
          board={board}
          createNewColumn={createNewColumn}
        />
      </Container>
    </Fragment>
  );
};

export default Board;
