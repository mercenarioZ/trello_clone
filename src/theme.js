import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#556cd6',
//         },
//         secondary: {
//             main: '#19857b',
//         },
//         error: {
//             main: red.A400, // The comma at the end of this line is called "trailing comma"!
//         },
//     },
// })

const theme = extendTheme({
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
})
export default theme
