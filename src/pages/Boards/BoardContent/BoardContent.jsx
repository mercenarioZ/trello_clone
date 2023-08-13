/* eslint-disable react/prop-types */
import Box from '@mui/material/Box'
import ListCols from './ListCols/ListColumns'
import { mapOrder } from '~/utilities/sorts'

const BoardContent = ({ board }) => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

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
            <ListCols columns={orderedColumns} />
        </Box>
    )
}

export default BoardContent
