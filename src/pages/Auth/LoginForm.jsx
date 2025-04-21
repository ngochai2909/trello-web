import { Box, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          maxWidth: '700px',
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
          Author: Hải Nguyễn
        </Typography>

        <Box>
          <TextField
            margin='normal'
            fullWidth
            id='email'
            label='Enter Email...'
            autoComplete='email'
            autoFocus
            sx={{ mb: 2 }}
            {...register('email', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: EMAIL_RULE,
                message: EMAIL_RULE_MESSAGE
              }
            })}
          />
          <FieldErrorAlert errors={errors} fieldName='email' />
        </Box>
        <Box>
          <TextField
            margin='normal'
            fullWidth
            name='password'
            label='Enter Password...'
            type='password'
            id='password'
            autoComplete='current-password'
            sx={{ mb: 3 }}
          />
        </Box>
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
          Login
        </Button>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography color='text.secondary'>
            Don&apos;t have an account?
          </Typography>
          <Link
            href='/register'
            sx={{
              textDecoration: 'none',
              color: '#0055ff',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Register now!
          </Link>
        </Box>
      </Box>
    </form>
  )
}

export default LoginForm
