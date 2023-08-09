/* eslint-disable react/prop-types */
import Box from '@mui/material/Box'
import Card from './Card/Card'

const ListCards = ({ cards }) => {
    return (
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
            {cards?.map(card => <Card key={card._id} card={card} />)}
        </Box>
    )
}

export default ListCards
