/* eslint-disable react/prop-types */
import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const ListCards = ({ cards }) => {
    return (
        <SortableContext
            items={cards.map((c) => c._id)}
            strategy={verticalListSortingStrategy}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    p: '1px 6px',
                    m: '0 5px',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    maxHeight: (theme) =>
                        `calc(${theme.projectCustomConst.boardContentHeight}
                            - ${theme.spacing(4)}
                            - ${theme.projectCustomConst.headerHeight}
                            - ${theme.projectCustomConst.footerHeight})`,
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#ced0da',
                        borderRadius: '5px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#bfc2cf',
                    },
                }}
            >
                {cards?.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                    />
                ))}
            </Box>
        </SortableContext>
    )
}

export default ListCards
