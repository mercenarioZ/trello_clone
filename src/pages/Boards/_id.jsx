// Board details
import Container from '@mui/material/Container'
import { Fragment } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'

const Board = () => {
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

                <BoardBar board={mockData.board} />

                <BoardContent board={mockData.board} />
            </Container>
        </Fragment>
    )
}

export default Board
