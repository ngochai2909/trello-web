import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatter'
const MenuStyle = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board }) {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        borderTop: '1px solid #00bfa5',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MenuStyle}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
        />
        <Chip
          sx={MenuStyle}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MenuStyle}
          icon={<AddToDriveIcon />}
          label='Add to google drive '
          clickable
        />
        <Chip
          sx={MenuStyle}
          icon={<BoltIcon />}
          label='Automation '
          clickable
        />
        <Chip
          sx={MenuStyle}
          icon={<FilterListIcon />}
          label='Filter '
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
          variant='outlined'
          startIcon={<PersonAddIcon />}
        >
          Invite
        </Button>
        <Tooltip title='avatar' arrow>
          <AvatarGroup
            max={7}
            sx={{
              gap: '10px',
              '& .MuiAvatar-root': {
                width: 34,
                height: 34,
                fontSize: 16,
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                '&:first-of-type': {
                  bgcolor: '#a4b0be'
                }
              }
            }}
          >
            <Avatar
              alt='Hai Nguyen'
              src='https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/477943168_2406293513038133_8698001168044826872_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEIDfZJdb2Go2XlNNTc85ZmXPHllKimxsZc8eWUqKbGxns_QCX-sB8MmAESR_FvjWkN8cJXAcVGa_Pm1ERzPdNE&_nc_ohc=rJ0siRgTtKYQ7kNvgE2T5YI&_nc_oc=Adg8BbUOrIql7XpYVcDHgUJjhIm3A0xs5t-6k-mMqDJdC_UWk67YixJBMdDAkWItOTE&_nc_zt=23&_nc_ht=scontent.fhan5-2.fna&_nc_gid=w2ljyqWwr-nR45M2SSufBA&oh=00_AYE7gADjLgXw_h3uqQOdTWEc_0agUWEk7sAeLEPAyCx5xg&oe=67DB9B3A'
            />
          </AvatarGroup>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default BoardBar
