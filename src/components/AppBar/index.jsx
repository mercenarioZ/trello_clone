import Box from '@mui/material/Box'
import ModeSelect from '../ModeSelect'

const AppBar = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'primary.light',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                height: (theme) => theme.projectCustomConst.appBarHeight,
            }}
        >
            <ModeSelect />
        </Box>
    )
}

export default AppBar
