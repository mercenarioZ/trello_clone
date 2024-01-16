import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ReactComponent as TrelloLogo } from "~/assets/trello.svg";
import ModeSelect from "~/components/ModeSelect/ModeSelect"; // `~ = /src`
import Recent from "./Menu/Recent";
import Starred from "./Menu/Starred";
import Templates from "./Menu/Templates";
import Workspaces from "./Menu/Workspaces";
import Profile from "./Profile";
import { useState } from "react";

const AppBar = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        height: (theme) => theme.projectCustomConst.appBarHeight,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          paddingLeft: "8px",
        }}
      >
        <AppsIcon sx={{ color: "white" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            fontSize="small"
            inheritViewBox
            component={TrelloLogo}
            sx={{ color: "white" }}
          />
          <Typography
            variant="span"
            sx={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Chello
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1,
            alignItems: "center",
          }}
        >
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx={{
              fontWeight: "bold",
              margin: "5px",
              color: "white",
              border: "none",
              "&:hover": {
                border: "none",
              },
            }}
            variant="outlined"
            startIcon={<AddToPhotosIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          paddingRight: "15px",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          id="outlined-search"
          label="Search"
          type="text"
          size="small"
          sx={{
            minWidth: 100,
            maxWidth: 174,
            "& label": { color: "white" },
            "& input": { color: "white" },
            "& label.Mui-focused": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: searchValue ? "white" : "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => setSearchValue("")}
                />
              </InputAdornment>
            ),
          }}
        />

        <ModeSelect />

        <Tooltip title="Notifications">
          <Badge
            sx={{ cursor: "pointer" }}
            color="warning"
            variant="dot"
          >
            <NotificationsNoneIcon sx={{ color: "white" }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: "pointer", color: "white" }} />
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  );
};

export default AppBar;
