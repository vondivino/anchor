import { useRef } from 'react'
import firebase from '../../lib/firebase'

export default function LoginPage() {
  
	const emailInput = useRef()
	const pwdInput = useRef()

	function handleSubmit(e) {
		e.preventDefault()

    /**
     * 
     * This will try to sign in the user in Firebase.
     * If successful, a function in state.js will 
     * trigger to create a session to be used by 
     * the server.
     * 
     */
		firebase
    .auth()
    .signInWithEmailAndPassword(
      emailInput.current.value,
      pwdInput.current.value
    )

		e.target.reset()
	}

	return (
		<form onSubmit={handleSubmit}>
			<input 
        type='email' 
        ref={emailInput} 
        placeholder='Enter email' 
      />
			<input
				type='password'
				ref={pwdInput}
				placeholder='Enter password'
			/>
			<button type='submit'>Log In</button>
		</form>
	)
}
