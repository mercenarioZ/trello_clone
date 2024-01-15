/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AddCard,
  ContentCopy,
  ContentPaste,
  DragHandle,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Cloud from "@mui/icons-material/Cloud";
import ContentCut from "@mui/icons-material/ContentCut";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { toast } from "react-toastify";
import ListCards from "./ListCards/ListCards";

const Col = ({ column, createNewCard }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  // This style will be applied to the column when it is being dragged
  const dndkitColumnStyles = {
    // Use CSS.Translate.toString() if you don't want to have the scale transformation applied.
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.7 : undefined,
  };

  // state for opening/closing the add new card form
  const [openAddNewCardForm, setOpenAddNewCardForm] = React.useState(false);

  // state for handling the input of the add new card form
  const [newCardTitle, setNewCardTitle] = React.useState("");

  const toggleOpenAddNewCardForm = () => {
    setOpenAddNewCardForm(!openAddNewCardForm);
    setNewCardTitle("");
  };

  const addNewCard = () => {
    if (!newCardTitle.trim()) {
      toast.error("Please enter a title for the card!");
      return;
    }

    // Call API to create new card
    createNewCard({
      columnId: column._id,
      title: newCardTitle,
    });

    toggleOpenAddNewCardForm();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const orderedCards = column.cards;

  return (
    <div
      ref={setNodeRef}
      style={dndkitColumnStyles}
      {...attributes}
    >
      <Box
        {...listeners}
        sx={{
          minWidth: 300,
          maxWidth: 300,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          ml: 2,
          borderRadius: "7px",
          height: "fit-content",
          overflowX: "hidden",
          maxHeight: (theme) =>
            `calc(${theme.projectCustomConst.boardContentHeight}
                        - ${theme.spacing(4)})`,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: (theme) => theme.projectCustomConst.headerHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            {column?.title}
          </Typography>
          {/* Dropdown menu */}
          <Box>
            <Tooltip title="Column menu">
              <ExpandMoreIcon
                id="basic-column-dropdown"
                aria-controls={open ? "menu-column-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  color: "text.primary",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
            <Menu
              id="menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCard fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archieve this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Card list */}
        <ListCards cards={orderedCards} />
        {/* Footer */}
        <Box
          sx={{
            height: (theme) => theme.projectCustomConst.footerHeight,
            p: 2,
          }}
        >
          {!openAddNewCardForm ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={toggleOpenAddNewCardForm}
                startIcon={<AddCard />}
              >
                Add new card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandle sx={{ cursor: "pointer" }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                py: 0.7,
              }}
            >
              <TextField
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                id="outlined-search"
                label="Enter card title"
                autoFocus
                data-no-dnd="true"
                variant="outlined"
                type="text"
                size="small"
                sx={{
                  "& label": { color: "text.primary" },
                  "& input": {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark" ? "#333643" : "white",
                  },
                  "& label.Mui-focused": {
                    color: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&:hover fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  },

                  "& .MuiOutlinedInput-input": {
                    borderRadius: 1,
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    width: "50%",
                    p: 0.3,
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
                  onClick={addNewCard}
                >
                  Add
                </Button>

                <Button
                  sx={{
                    justifyContent: "flex-end",
                    color: "white",
                    py: 0.5,
                    "&:hover": {
                      bgcolor: "transparent",
                      color: "red",
                    },
                    maxWidth: "10%",
                  }}
                  onClick={toggleOpenAddNewCardForm}
                >
                  <CloseIcon
                    sx={{
                      color: (theme) => theme.palette.warning.light,
                      cursor: "pointer",
                    }}
                    fontSize="small"
                  />
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Col;
