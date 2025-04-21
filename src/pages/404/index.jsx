import { Box, Typography, Link } from '@mui/material'
import { styled, keyframes } from '@mui/system'

const scan = keyframes`
  0% { background-position: 0 -100vh; }
  35%, 100% { background-position: 0 100vh; }
`

const Noise = styled(Box)({
  pointerEvents: 'none',
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundImage:
    'url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  zIndex: -1,
  opacity: 0.02
})

const Overlay = styled(Box)({
  pointerEvents: 'none',
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: `
    repeating-linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0) 100%
    )`,
  backgroundSize: 'auto 4px',
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `
      linear-gradient(
        0deg,
        transparent 0%,
        rgba(32, 128, 32, 0.2) 2%,
        rgba(32, 128, 32, 0.8) 3%,
        rgba(32, 128, 32, 0.2) 3%,
        transparent 100%
      )`,
    backgroundRepeat: 'no-repeat',
    animation: `${scan} 7.5s linear infinite`
  }
})

const Terminal = styled(Box)({
  margin: '0 auto',
  boxSizing: 'inherit',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '1000px',
  maxWidth: '100%',
  padding: '4rem',
  textTransform: 'uppercase',
  fontFamily: 'Inconsolata, Helvetica, sans-serif',
  fontSize: '1.5rem',
  color: 'rgba(128, 255, 128, 0.8)',
  textShadow: `
    0 0 1ex rgba(51, 255, 51, 1),
    0 0 2px rgba(255, 255, 255, 0.8)
  `,
  zIndex: 2,
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
})

const Output = styled(Typography)({
  color: 'rgba(128, 255, 128, 0.8)',
  textShadow: `
    0 0 1px rgba(51, 255, 51, 0.4),
    0 0 2px rgba(255, 255, 255, 0.8)
  `,
  '&::before': {
    content: '" > "'
  }
})

const NotFound404 = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#000000',
        backgroundImage: `
          radial-gradient(#11581E, #041607),
          url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif")
        `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Noise />
      <Overlay />
      <Terminal>
        <Typography variant='h1' sx={{ mb: 4 }}>
          Error{' '}
          <Box component='span' sx={{ color: '#fff' }}>
            404
          </Box>
        </Typography>
        <Output>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </Output>
        <Output>
          Please try to{' '}
          <Link href='/' sx={{ color: '#fff', textDecoration: 'none' }}>
            &nbsp;go back
          </Link>{' '}
          or{' '}
          <Link href='/' sx={{ color: '#fff', textDecoration: 'none' }}>
            &nbsp;return to the homepage
          </Link>
          .
        </Output>
        <Output>Good luck.</Output>
      </Terminal>
    </Box>
  )
}

export default NotFound404
