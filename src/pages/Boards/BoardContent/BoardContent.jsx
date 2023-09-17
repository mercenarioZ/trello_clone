/* eslint-disable react/prop-types */
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import React from 'react'
import { mapOrder } from '~/utilities/sorts'
import ListCols from './ListCols/ListColumns'

const BoardContent = ({ board }) => {
    // Require the mouse to move by 10 pixels before activating the pointer event (drag)
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 10 },
    })

    // Tap and hold for 250ms before activating the touch event (drag), and allow a 5px shift before cancelling the event 
    const touchSensor = useSensor(TouchSensor, {
        // delay by 250ms which means that the user has to hold the element for 250ms before it can be dragged
        // tolerance of 5px which means that the user can move their finger up to 5px before the drag is cancelled
        activationConstraint: { delay: 250, tolerance: 30 },
    })

    const mySensors = useSensors(mouseSensor, touchSensor)

    const [orderedColumns, setOrderedColumns] = React.useState([])

    React.useEffect(() => {
        setOrderedColumns(
            mapOrder(board?.columns, board?.columnOrderIds, '_id')
        )
    }, [board])

    const handleDragEnd = (event) => {
        console.log('handleDragEnd: ', event)
        const { active, over } = event

        // If there is no over column (dragging out of the board), return
        if (!over) return

        // If the over column is not the same as the active column, continue
        if (active.id !== over.id) {
            console.log('Dragged over column: ', over.id)

            // Take the old column index (from active.id)
            const oldColumnIndex = orderedColumns.findIndex(
                (col) => col._id === active.id
            )

            // Take the new column index (from over.id)
            const newColumnIndex = orderedColumns.findIndex(
                (col) => col._id === over.id
            )

            // Use arrayMove to change the columns order
            // Columns array after being moved
            const dndOrderedColumns = arrayMove(
                orderedColumns,
                oldColumnIndex,
                newColumnIndex
            )

            // Get the new column order ids
            // const dndOrderedColumnIds = dndOrderedColumns.map(col => col._id)

            // Update the state with the new column order
            setOrderedColumns(dndOrderedColumns)
        }
    }

    return (
        // Container
        <DndContext
            onDragEnd={handleDragEnd}
            sensors={mySensors}
        >
            <Box
                sx={{
                    backgroundColor: 'primary.main',
                    height: (theme) =>
                        theme.projectCustomConst.boardContentHeight,
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
        </DndContext>
    )
}

export default BoardContent
