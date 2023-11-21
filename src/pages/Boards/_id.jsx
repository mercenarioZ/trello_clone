// Board details
import Container from '@mui/material/Container'
import React, { Fragment } from 'react'
import { fetchBoardDetailAPI } from '~/apis'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

const Board = () => {
    const [board, setBoard] = React.useState(null)

    React.useEffect(() => {
        const boardId = '655623ad0200bcdda149a115'

        // Call API to get board details
        fetchBoardDetailAPI(boardId).then((response) => {
            setBoard(response)
        })
    }, [])

    return (
        <Fragment>
            <Container
                disableGutters
                maxWidth={false}
                sx={{
                    height: '100vh',
                }}
            >
                <AppBar />

                <BoardBar board={board} />

                <BoardContent board={board} />
            </Container>
        </Fragment>
    )
}

export default Board
