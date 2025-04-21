import { Box, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'

function RegisterForm() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        mt: 8
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <LockOutlinedIcon
          sx={{
            backgroundColor: '#0055ff',
            color: 'white',
            p: 1,
            borderRadius: '50%'
          }}
        />
        <MenuBookOutlinedIcon
          sx={{
            backgroundColor: '#0055ff',
            color: 'white',
            p: 1,
            borderRadius: '50%'
          }}
        />
      </Box>

      <Typography
        component='h1'
        variant='h6'
        sx={{
          mb: 3,
          color: '#666',
          fontWeight: 400
        }}
      >
        Author: TrungQuanDev
      </Typography>

      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='Enter Email...'
        name='email'
        autoComplete='email'
        autoFocus
        sx={{ mb: 2 }}
      />

      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label='Enter Password...'
        type='password'
        id='password'
        autoComplete='new-password'
        sx={{ mb: 2 }}
      />

      <TextField
        margin='normal'
        required
        fullWidth
        name='confirmPassword'
        label='Enter Password Confirmation...'
        type='password'
        id='confirmPassword'
        autoComplete='new-password'
        sx={{ mb: 3 }}
      />

      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{
          mb: 2,
          py: 1.5,
          fontSize: '1rem',
          textTransform: 'none',
          backgroundColor: '#0055ff',
          '&:hover': {
            backgroundColor: '#0044cc'
          }
        }}
      >
        Register
      </Button>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography color='text.secondary'>Already have an account?</Typography>
        <Link
          href='/login'
          sx={{
            textDecoration: 'none',
            color: '#0055ff',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Log in!
        </Link>
      </Box>
    </Box>
  )
}

export default RegisterForm
