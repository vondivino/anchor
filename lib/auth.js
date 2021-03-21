import { 
  createContext, 
  useContext, 
  useState 
} from 'react'
import firebase from './firebase'
import { useRouter } from 'next/router'

const authContext = createContext()

export function AuthProvider({ children }) {

  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      handleLogin(user.uid)
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  })

  // DO NOT TOUCH 
  function handleLogin(userID) {
		fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: userID }),
		})
  }

  // DO NOT TOUCH
  function handleLogout() {
		firebase.auth().signOut();
		fetch('/api/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({}),
		})
    router.push('/auth/login/')
  }

  const value = {
    loggedIn,
    handleLogout
  }

  return (
		<authContext.Provider value={value}>
			{children}
		</authContext.Provider>
  )
} 

export function useAuth() {
  return useContext(authContext)
}




