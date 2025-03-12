import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme
} from '@mui/material'

// import {
//   DarkModeOutlined,
//   LightModeIcon,
//   SettingsBrightnessOutlined
// } from '@mui/icons-material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleModeChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <FormControl
      size='small'
      sx={{
        minWidth: 120
      }}
    >
      <InputLabel
        sx={{
          color: 'white',
          '&.Mui-focused': {
            color: 'white'
          }
        }}
        id='label-select-dark-light-mode'
      >
        Mode
      </InputLabel>
      <Select
        labelId='label-select-dark-light-mode'
        id='select-dark-light-mode'
        value={mode}
        label='Mode'
        onChange={handleModeChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '.MuiSvgIcon-root': {
            color: 'white'
          }
        }}
      >
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LightModeIcon fontSize='small' /> Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DarkModeIcon /> Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SettingsBrightnessIcon /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
