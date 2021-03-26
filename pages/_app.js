import '../lib/global.css'
import { AuthProvider } from '../lib/auth'

export default function MyApp({ Component, pageProps }) {
  return (
		<AuthProvider>
				<Component {...pageProps} />
		</AuthProvider>
  )
}

