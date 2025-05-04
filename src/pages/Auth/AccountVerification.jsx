import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

function AccountVerification() {
  let [searchParams] = useSearchParams()

  const email = searchParams.get('email')
  const token = searchParams.get('token')

  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => {
        setIsVerified(true)
      })
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to='/404' />
  }

  if (!isVerified) {
    return <PageLoadingSpinner caption='Verifying account...' />
  }

  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
