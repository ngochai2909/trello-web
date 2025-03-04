import {
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
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <InputLabel id='label-select-dark-light-mode'>Mode</InputLabel>
      <Select
        labelId='label-select-dark-light-mode'
        id='select-dark-light-mode'
        value={mode}
        label='Mode'
        onChange={handleModeChange}
      >
        <MenuItem value='light'>
          <LightModeIcon fontSize='small' /> Light
        </MenuItem>
        <MenuItem value='dark'>
          <DarkModeIcon /> Dark
        </MenuItem>
        <MenuItem value='system'>
          <SettingsBrightnessIcon /> System
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
