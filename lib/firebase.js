import firebase from 'firebase'

/**
 * 
 * This is the Firebase config.
 * 
 * Please store it in a .env file in production.
 * DO NOT TOUCH THIS
 * 
 */
const config = {
	apiKey: 'AIzaSyAkfZ1L62A5AM_6Sw2SvUeZ697fj0SUfLk',
	authDomain: 'dschackathon-b9472.firebaseapp.com',
	projectId: 'dschackathon-b9472',
	storageBucket: 'dschackathon-b9472.appspot.com',
	messagingSenderId: '600508866070',
	appId: '1:600508866070:web:70ee2e5fe211b00658df37',
}

try {
	firebase.initializeApp(config)
} catch (err) {
	if (!/already exists/.test(err.message)) {
		console.error('Firebase initialization error', err.stack)
	}
}

export default firebase
