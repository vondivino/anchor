import {
  Typography,
  Grid,
  TextField,
  Card,
  CardContent,
  Button
} from '@material-ui/core'
import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AuthLayout from '../../components/AuthLayout'
import firebase from '../../lib/firebase'

export default function RegisterPage() {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pwd1, setPwd1] = useState('')
  const [pwd2, setPwd2] = useState('')
  const auth = firebase.auth()

  function handleSubmit(e) {
    e.preventDefault()

    if (pwd1 === pwd2 ) {
      auth.createUserWithEmailAndPassword(email, pwd2)
      .finally(() => router.push('/auth/login/'))
      .catch(() => e.target.resset())
    }
  }

  return (
    <AuthLayout>
      <Head>
        <title>Anchor | Register</title>
      </Head>
      <Grid item md={4}>
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              component="h1"
            >
              Register
					</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                fullWidth
                label="Email"
                margin="normal"
              />
              <TextField
                onChange={e => setPwd1(e.target.value)}
                value={pwd1}
                type="password"
                fullWidth
                label="Password"
                margin="normal"
              />
              <TextField
                onChange={e => setPwd2(e.target.value)}
                value={pwd2}
                type="password"
                fullWidth
                label="Confirm Password"
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Register
						</Button>
            </form>
          </CardContent>
          <Button
            style={{ margin: '5px' }}
            onClick={() => router.push('/auth/login/')}
          >
            Already have an account?
					</Button>
        </Card>
      </Grid>
    </AuthLayout>
  )
}
