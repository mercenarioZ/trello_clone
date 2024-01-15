/* eslint-disable react/prop-types */
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NoteAdd } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Col from "./Col/Column.jsx";
import { toast } from "react-toastify";

const ListCols = ({ columns, createNewColumn, createNewCard, deleteCol }) => {
  const [openAddCol, setOpenAddCol] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const toggleAddCol = () => {
    setOpenAddCol(!openAddCol);
    setNewColumnTitle("");
  };

  const addNewColumn = () => {
    // TODO: add new column to db
    if (!newColumnTitle) {
      toast.error("Please enter a title for the column", {
        position: "bottom-right",
        autoClose: 2500,
        closeOnClick: true,
        theme: "colored",
        hideProgressBar: true,
      });

      return;
    }

    // API call
    createNewColumn({ title: newColumnTitle });

    // Close the form and reset the title
    toggleAddCol();
  };

  return (
    // SortableContext requires items as an array of strings or numbers
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "auto",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          p: "6px 0",
          "&::webkit-scrollbar-track": { m: 1.5 },
        }}
      >
        {/* Column */}
        {columns?.map((column) => (
          <Col
            createNewCard={createNewCard}
            deleteCol={deleteCol}
            key={column._id}
            column={column}
          />
        ))}

        {/* Add new column */}
        {!openAddCol ? (
          <Box
            onClick={toggleAddCol}
            sx={{
              minWidth: 250,
              maxWidth: 250,
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            <Button
              startIcon={<NoteAdd />}
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: 250,
              maxWidth: 250,
              mx: 2,
              p: 1,
              borderRadius: "6px",
              bgcolor: "#ffffff3d",
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              id="outlined-search"
              label="Column title"
              autoFocus
              variant="outlined"
              type="text"
              size="small"
              sx={{
                "& label": { color: "white" },
                "& input": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "6px",
                gap: 2,
              }}
            >
              <Button
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  width: "50%",
                  py: 1,
                  justifyContent: "flex-mid",
                  boxShadow: "none",
                  border: ".5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.success.main,
                  },
                }}
                variant="contained"
                color="success"
                size="small"
                onClick={addNewColumn}
              >
                Add
              </Button>

              <Button
                sx={{
                  justifyContent: "flex-mid",
                  color: "white",
                  width: "6%",
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "red",
                  },
                }}
                onClick={toggleAddCol}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
};

export default ListCols;
