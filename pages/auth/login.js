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

export default function LoginPage() {
  
	const router = useRouter()
	const [email, setEmail ] = useState('')
	const [pwd, setPwd ] = useState('')
	const auth = firebase.auth()

	function handleSubmit(e) {
		e.preventDefault()

		auth.signInWithEmailAndPassword(email, pwd)
		.finally(() => router.push('/anchor/'))
		.catch(() => e.target.reset())
	}

	return (
		<AuthLayout>
			<Head>
				<title>Anchor | Log In</title>
			</Head>
			<Grid item md={4}>
				<Card>
					<CardContent>
					<Typography 
						gutterBottom 
						variant="h4" 
						component="h1"
					>
						Log In
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField 
							onChange={e=> setEmail(e.target.value)}
							value={email}
							type="email"
							fullWidth
							label="Email"
							margin="normal"
						/>
						<TextField 
							onChange={e => setPwd(e.target.value)}
							value={pwd}
							type="password"
							fullWidth
							label="Password"
							margin="normal"
						/>
						<Button 
							variant="contained" 
							color="primary"
							type="submit"
						>
							Log In
						</Button>
					</form>
					</CardContent>
					<Button 
						style={{ margin: '5px'}}
						onClick={() => router.push('/auth/register/')}
					>
						Not registered yet?
					</Button>
				</Card>
			</Grid>
		</AuthLayout>
	)
}
