/* eslint-disable react/prop-types */
import Box from '@mui/material/Box'
import ListCols from './ListCols/ListCols'

const BoardContent = ({ board }) => {
    return (
        // Container
        <Box
            sx={{
                backgroundColor: 'primary.main',
                height: (theme) => theme.projectCustomConst.boardContentHeight,
                width: '100%',
                bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',

                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
            }}
        >
            <ListCols columns={board?.columns} />
        </Box>
    )
}

export default BoardContent
