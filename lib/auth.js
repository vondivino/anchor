import { 
  createContext, 
  useContext, 
  useState 
} from 'react'
import firebase from './firebase'

const authContext = createContext()

export function AuthProvider({ children }) {

  const [loggedIn, setLoggedIn] = useState(false)

  /**
   * 
   * Below will check the authentication logic of the app.
   * 
   * If a user is successfully logged in Firebase,
   * then a cookie will be created to be used by the server.
   * The global state will also be set to loggedIn.
   * 
   * If a user is successfully logged out in Firebase,
   * then the cookie will be destroyed. The global state 
   * will also be set to notLoggedIn.
   * 
   */
  
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
  }

  return (
		<authContext.Provider value={{ loggedIn, handleLogout }}>
			{children}
		</authContext.Provider>
  )
} 

export function useAuth() {
  return useContext(authContext)
}




