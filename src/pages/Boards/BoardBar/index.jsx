import Box from '@mui/material/Box'

const BoardBar = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'secondary.light',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                height: (theme) => theme.projectCustomConst.boardBarHeight,
            }}
        >
            Board bar
        </Box>
    )
}

export default BoardBar
