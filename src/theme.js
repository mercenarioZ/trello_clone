import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
    projectCustomConst: {
        appBarHeight: '59px',
        boardBarHeight: '61px',
    },

    colorSchemes: {
        light: {
            palette: {
                primary: teal,
                secondary: deepOrange,
            },
        },
        dark: {
            palette: {
                primary: cyan,
                secondary: orange,
            },
        },
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
                        backgroundColor: '#bdc3c8',
                        borderRadius: '5px'
                    },

                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#00b894'
                    }
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Make CAPITAL to normal
                },
            },
        },

        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem',
                }),
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem',
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                    },

                    '&:hover': {
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                        },
                    },

                    '& fieldset': {
                        borderWidth: '1.5px !important',
                    },
                }),
            },
        },
    },
})
export default theme
