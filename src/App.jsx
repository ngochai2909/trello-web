import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      {mode === 'light' ? 'Turn Dark' : 'Turn Light'}
    </button>
  )
}

function App() {
  return (
    <>
      <ModeToggle />
      <hr />
      <div>hai nguyen</div>
      <Button variant='text'>Text</Button>
      <Button variant='contained'>Contained</Button>
      <Button variant='outlined'>Outlined</Button>
    </>
  )
}

export default App
