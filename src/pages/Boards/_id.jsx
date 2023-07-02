// Board details
import Container from '@mui/material/Container'
import { Fragment } from 'react'
import AppBar from '../../components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

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

                {/* Board bar */}
                <BoardBar />

                <BoardContent />
            </Container>
        </Fragment>
    )
}

export default Board
