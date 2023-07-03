import AppsIcon from '@mui/icons-material/Apps'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ReactComponent as TrelloLogo } from '~/assets/trello.svg'
import ModeSelect from '~/components/ModeSelect' // `~ = /src`
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import Workspaces from './Menu/Workspaces'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Profile'

const AppBar = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: (theme) => theme.projectCustomConst.appBarHeight,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    paddingLeft: '8px',
                }}
            >
                <AppsIcon sx={{ color: 'primary.main' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon
                        inheritViewBox
                        component={TrelloLogo}
                        sx={{ color: 'primary.main' }}
                    />
                    <Typography
                        variant='span'
                        sx={{
                            color: 'primary.main',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Trello
                    </Typography>
                </Box>

                <Workspaces />
                <Recent />
                <Starred />
                <Templates />

                <Button sx={{ fontWeight: 'bold' }} variant='outlined'>
                    Create
                </Button>
            </Box>

            <Box
                sx={{
                    paddingRight: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <TextField
                    id='outlined-search'
                    label='Search'
                    type='search'
                    size='small'
                />
                <ModeSelect />

                <Tooltip title='Notifications'>
                    <Badge
                        sx={{ cursor: 'pointer' }}
                        color='secondary'
                        variant='dot'
                    >
                        <NotificationsNoneIcon />
                    </Badge>
                </Tooltip>

                <Tooltip title='Help'>
                    <HelpOutlineIcon sx={{ cursor: 'pointer' }} />
                </Tooltip>

                <Profile />
            </Box>
        </Box>
    )
}

export default AppBar
