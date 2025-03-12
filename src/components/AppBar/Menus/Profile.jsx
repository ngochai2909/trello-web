import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import React from 'react'

import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'

import { Logout, PersonAdd, Settings } from '@mui/icons-material'

function Profile() {
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
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-button-profile' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt='Hai Nguyen Avatar'
            src='https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/477943168_2406293513038133_8698001168044826872_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9LCPzqqiR5MQ7kNvgHIb8Y-&_nc_oc=AdgJvSOni8zegnVCQR9T8plP3oKGbOPN5PDxJnxWGxzNZZmguzozG9I9qo8U3HuXNqI&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=ABj7KBoy9nZ1wboqjEmyKLP&oh=00_AYA5E0dkK6oDTF2LWqgyBNUPmtwFnwsPPje-oO9pFt9M8Q&oe=67CC39BA'
          />
        </IconButton>
      </Tooltip>
      <Menu
        id='basic-menu-profile'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profile'
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
