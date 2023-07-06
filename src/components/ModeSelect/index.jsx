import FormControl from '@mui/material/FormControl'
import { useColorScheme } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import LightMode from '@mui/icons-material/LightMode'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import SettingBrightness from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
    const { mode, setMode } = useColorScheme()
    const handleChange = (event) => {
        const selectedMode = event.target.value
        setMode(selectedMode)
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
            <InputLabel
                id='select-mode'
                sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}
            >
                Mode
            </InputLabel>
            <Select
                labelId='select-mode'
                id='select-mode'
                value={mode}
                label='Mode'
                onChange={handleChange}
                sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '.MuiSvgIcon-root': {color: 'white'}
                }}
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

export default ModeSelect
