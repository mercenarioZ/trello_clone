import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
    projectCustomConst: {
        appBarHeight: '59px',
        boardBarHeight: '61px',
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
