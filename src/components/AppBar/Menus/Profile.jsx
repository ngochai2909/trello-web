import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import React from 'react'

import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import avt1 from '~/assets/avt1.jpg'

import { Logout, PersonAdd, Settings } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useConfirm } from 'material-ui-confirm'
import { logoutUserApi, selectCurrentUser } from '~/redux/user/userSlice'
import { Link } from 'react-router-dom'

function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const confirmLogout = useConfirm()

  const handleLogout = () => {
    confirmLogout({
      title: 'Logout',
      description: 'Are you sure you want to logout?'
    })
      .then(() => {
        dispatch(logoutUserApi())
      })
      .catch(() => {})
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
            src={currentUser?.avatar || avt1}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id='basic-menu-profile'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profile'
        }}
      >
        <Link to={'/settings/account'}>
          <MenuItem onClick={handleClose}>
            <Avatar
              src={currentUser?.avatar || avt1}
              sx={{ width: 28, height: 28, mr: 2 }}
            />{' '}
            Profile
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <Avatar
            src={currentUser?.avatar || avt1}
            sx={{ width: 28, height: 28, mr: 2 }}
          />{' '}
          My account
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
        <MenuItem onClick={handleLogout}>
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
