import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
const MenuStyle = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      px={2}
      sx={{
        backgroundColor: 'white',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        borderTop: '1px solid #00bfa5'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MenuStyle}
          icon={<DashboardIcon />}
          label='Hai nguyen Mern stack'
        />
        <Chip
          sx={MenuStyle}
          icon={<VpnLockIcon />}
          label='Public/Private Workspace'
        />
        <Chip
          sx={MenuStyle}
          icon={<AddToDriveIcon />}
          label='Add to google drive '
        />
        <Chip sx={MenuStyle} icon={<BoltIcon />} label='Automation ' />
        <Chip sx={MenuStyle} icon={<FilterListIcon />} label='Filter ' />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant='outlined' startIcon={<PersonAddIcon />}>
          Invite
        </Button>
        <Tooltip title='avatar' arrow>
          <AvatarGroup
            max={7}
            sx={{
              '& .MuiAvatar-root': {
                width: 34,
                height: 34,
                fontSize: 16
              }
            }}
          >
            <Avatar alt='Hai Nguyen' src='/static/images/avatar/1.jpg' />
          </AvatarGroup>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default BoardBar
