import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import FaceIcon from '@mui/icons-material/Face'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

const MENU_STYLES = {
    color: 'white',
    bgcolor: 'transparent',
    borderRadius: '8px',
    padding: '2px',

    '.MuiSvgIcon-root': {
        color: 'white',
    },

    '&:hover': {
        bgcolor: 'primary.50',
    },
}

const BoardBar = ({ board }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                height: (theme) => theme.projectCustomConst.boardBarHeight,
                justifyContent: 'space-between',
                overflowX: 'auto',
                paddingX: 2,
                bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                    sx={MENU_STYLES}
                    clickable
                    icon={<FaceIcon />}
                    label={board?.title}
                />

                <Chip
                    sx={MENU_STYLES}
                    clickable
                    icon={<AddToDriveIcon />}
                    label='Add to Google Drive'
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    startIcon={<PersonAddIcon />}
                    variant='outlined'
                    sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': { borderColor: 'white' },
                    }}
                >
                    Invite
                </Button>

                <AvatarGroup
                    total={10}
                    max={5}
                    sx={{
                        '& .MuiAvatar-root': {
                            width: 30,
                            height: 30,
                            fontSize: '0.875rem',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',

                            '&:first-of-type': {
                                backgroundColor: '#a4b0be',
                            },
                        },
                        gap: '5px',
                    }}
                >
                    <Tooltip title='User'>
                        <Avatar
                            alt='Nguyen Vu'
                            src='https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/299308522_3362964253949256_8945873176686498842_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=JksCqJ_2XsMAX_nPqy9&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfA4EKtpHCzVrbo9PUO-6tfLsedo6ySE60FXzSvL6y90KQ&oe=64A77239'
                        />
                    </Tooltip>

                    <Tooltip title='User'>
                        <Avatar
                            alt='Nguyen Vu'
                            src='https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/299308522_3362964253949256_8945873176686498842_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=JksCqJ_2XsMAX_nPqy9&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfA4EKtpHCzVrbo9PUO-6tfLsedo6ySE60FXzSvL6y90KQ&oe=64A77239'
                        />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar
