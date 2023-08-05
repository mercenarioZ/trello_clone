/* eslint-disable react/prop-types */
import { AttachFile, Comment, Group } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

function Card({ hideMedia }) {
    if (hideMedia) {
        return (
            <MuiCard
                sx={{
                    cursor: 'pointer',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0,2)',
                    overflow: 'unset',
                }}
            >
                <CardContent sx={{ padding: 1, '&:last-child': { p: 1 } }}>
                    <Typography>Card 2</Typography>
                </CardContent>
            </MuiCard>
        )
    }

    return (
        <Box>
            <MuiCard
                sx={{
                    cursor: 'pointer',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0,2)',
                    '&:last-child': { padding: 1.5 },
                    overflow: 'unset',
                }}
            >
                <CardMedia
                    sx={{ height: 140 }}
                    image='https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png'
                    title='green iguana' />
                <CardContent sx={{ padding: 1, '&:last-child': { p: 1 } }}>
                    <Typography>Card 1</Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    <Button
                        sx={{ fontWeight: 'bold' }}
                        size='small'
                        startIcon={<Group />}
                    >
                        10
                    </Button>
                    <Button
                        sx={{ fontWeight: 'bold' }}
                        size='small'
                        startIcon={<Comment />}
                    >
                        10
                    </Button>
                    <Button
                        sx={{ fontWeight: 'bold' }}
                        size='small'
                        startIcon={<AttachFile />}
                    >
                        10
                    </Button>
                </CardActions>
            </MuiCard>
        </Box>
    )
}

export default Card
