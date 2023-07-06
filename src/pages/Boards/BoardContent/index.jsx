import Box from '@mui/material/Box'

const BoardContent = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'primary.main',
                height: (theme) =>
                    `calc(100vh - ${theme.projectCustomConst.appBarHeight} - ${theme.projectCustomConst.boardBarHeight})`,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
            }}
        >
            Board content
        </Box>
    )
}

export default BoardContent
