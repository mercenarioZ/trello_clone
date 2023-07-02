import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Container from '@mui/material/Container'
import { useColorScheme } from '@mui/material/styles'
import { Fragment } from 'react'
import './App.css'
import LightMode from '@mui/icons-material/LightMode'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import SettingBrightness from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
    const { mode, setMode } = useColorScheme()
    const handleChange = (event) => {
        // setAge(event.target.value)
        const selectedMode = event.target.value
        setMode(selectedMode)
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
            <InputLabel id='select-mode'>Mode</InputLabel>
            <Select
                labelId='select-mode'
                id='select-mode'
                value={mode}
                label='Mode'
                onChange={handleChange}
            >
                <MenuItem value='light'>
                    {' '}
                    {/* In MUI, use `Box` instead of `div` */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <LightMode fontSize='small' />
                        Light
                    </Box>
                </MenuItem>
                <MenuItem value='dark'>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <DarkModeOutlined fontSize='small' />
                        Dark
                    </Box>
                </MenuItem>
                <MenuItem value='system'>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <SettingBrightness fontSize='small' />
                        System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    )
}

// function ModeToggle() {
//     // const { mode, setMode } = useColorScheme()
//     // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
//     // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')

//     return (
//         <Button
//             onClick={() => {
//                 setMode(mode === 'light' ? 'dark' : 'light')
//             }}
//         >
//             {mode === 'light' ? 'Turn dark' : 'Turn light'}
//         </Button>
//     )
// }

function App() {
    const containerStyle = {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'primary.main',
    }

    return (
        <Fragment>
            <ModeSelect />
            <hr />
            {/* <ModeToggle /> */}
            <Container sx={containerStyle}></Container>
        </Fragment>
    )
}

export default App
