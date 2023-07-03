import PersonAdd from '@mui/icons-material/PersonAdd'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Profile = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box>
            <Tooltip title='Account settings'>
                <IconButton
                    onClick={handleClick}
                    size='small'
                    aria-controls={open ? 'basic-menu-profile' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        sx={{ width: 32, height: 32 }}
                        src='https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/299308522_3362964253949256_8945873176686498842_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=JksCqJ_2XsMAX_nPqy9&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfA4EKtpHCzVrbo9PUO-6tfLsedo6ySE60FXzSvL6y90KQ&oe=64A77239'
                        alt='Nai'
                    />
                </IconButton>
            </Tooltip>

            <Menu
                id='basic-menu-profile'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button-profile',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar sx={{width: 30, height: 30, mr: 1}} /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar sx={{width: 30, height: 30, mr: 1}} /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize='small' />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize='small' />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default Profile
