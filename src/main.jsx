import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import theme from "~/theme.js";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmProvider } from "material-ui-confirm";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CssVarsProvider theme={theme}>
    <ConfirmProvider
      defaultOptions={{
        allowClose: false,
        dialogProps: {
          maxWidth: "xs",
        },
      }}
    >
      <CssBaseline />
      <App />
      <ToastContainer position="bottom-right" />
    </ConfirmProvider>
  </CssVarsProvider>
);
