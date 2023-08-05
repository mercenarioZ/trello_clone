import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '59px'
const BOARD_BAR_HEIGHT = '61px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const HEADER_HEIGHT = '50px'
const FOOTER_HEIGHT = '45px'

const theme = extendTheme({
    projectCustomConst: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        headerHeight: HEADER_HEIGHT,
        footerHeight: FOOTER_HEIGHT,
    },

    // Custom mode
    colorSchemes: {
        light: {},
        dark: {},
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '7px',
                        height: '7px',
                    },

                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#dcdde1',
                        borderRadius: '5px',
                    },

                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#fff',
                    },
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Make CAPITAL to normal
                    borderWidth: '0.5px',
                },
            },
        },

        MuiInputLabel: {
            styleOverrides: {
                root: { fontSize: '0.875rem' },
            },
        },

        MuiTypography: {
            styleOverrides: {
                root: {
                    '&.MuiTypography-body1': {
                        fontSize: '0.875rem',
                    },
                },
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',

                    '& fieldset': {
                        borderWidth: '0.6px !important',
                    },

                    '&.Mui-focused fieldset': {
                        borderWidth: '3px !important',
                    },
                },
            },
        },
    },
})
export default theme
