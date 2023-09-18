/* eslint-disable react/prop-types */

import Box from '@mui/material/Box'
import Col from './Col/Column.jsx'
import Button from '@mui/material/Button'
import { NoteAdd } from '@mui/icons-material'
import {
    SortableContext,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable'

const ListCols = ({ columns }) => {
    return (
        // SortableContext requires items as an array of strings or numbers
        <SortableContext
            items={columns?.map((c) => c._id)}
            strategy={horizontalListSortingStrategy}
        >
            <Box
                sx={{
                    bgcolor: 'inherit',
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    p: '6px 0',
                    '&::webkit-scrollbar-track': { m: 1.5 },
                }}
            >
                {/* Column */}
                {columns?.map((column) => (
                    <Col
                        key={column._id}
                        column={column}
                    />
                ))}

                <Box
                    sx={{
                        minWidth: 200,
                        maxWidth: 200,
                        mx: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d',
                    }}
                >
                    <Button
                        startIcon={<NoteAdd />}
                        sx={{
                            color: 'white',
                            width: '100%',
                            justifyContent: 'flex-start',
                            pl: 2.5,
                            py: 1,
                        }}
                    >
                        Add new column
                    </Button>
                </Box>
            </Box>
        </SortableContext>
    )
}

export default ListCols
