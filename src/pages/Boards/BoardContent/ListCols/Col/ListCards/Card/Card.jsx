/* eslint-disable react/prop-types */
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AttachFile, Comment, Group } from '@mui/icons-material'
import { Box, Card as MuiCard, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

function Card({ card }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: card._id, data: { ...card } })

    const dndkitCardStyles = {
        // Use CSS.Translate.toString() if you don't want to have the scale transformation applied.
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : undefined
    }

    const shouldShowCardActions = () => {
        return (
            !!card?.memberIds?.length ||
            !!card?.comments?.length ||
            !!card?.attachments?.length
        )
    }
    return (
        <Box>
            <MuiCard
                ref={setNodeRef}
                style={dndkitCardStyles}
                {...attributes}
                {...listeners}
                sx={{
                    cursor: 'pointer',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0,2)',
                    '&:last-child': { padding: 1.3 },
                    overflow: 'unset',
                }}
            >
                {card?.cover && (
                    <CardMedia
                        sx={{ height: 140 }}
                        image={card?.cover}
                    />
                )}

                <CardContent sx={{ padding: 1, '&:last-child': { p: 1 } }}>
                    <Typography>{card?.title}</Typography>
                </CardContent>

                {shouldShowCardActions() && (
                    <CardActions sx={{ p: '0 4px 8px 4px' }}>
                        {/* The '!!' is a trick to convert a value to boolean */}
                        {!!card?.memberIds?.length && (
                            <Button
                                sx={{ fontWeight: 'bold' }}
                                size='small'
                                startIcon={<Group />}
                            >
                                {card?.memberIds?.length}
                            </Button>
                        )}

                        {!!card?.comments?.length && (
                            <Button
                                sx={{ fontWeight: 'bold' }}
                                size='small'
                                startIcon={<Comment />}
                            >
                                {card?.comments?.length}
                            </Button>
                        )}

                        {!!card?.attachments?.length && (
                            <Button
                                sx={{ fontWeight: 'bold' }}
                                size='small'
                                startIcon={<AttachFile />}
                            >
                                {card?.attachments?.length}
                            </Button>
                        )}
                    </CardActions>
                )}
            </MuiCard>
        </Box>
    )
}

export default Card
