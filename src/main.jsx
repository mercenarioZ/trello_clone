import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import theme from '~/theme.js'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
    </CssVarsProvider>
)
