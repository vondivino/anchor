import cookie from 'cookie'

export default (req, res) => {
	/**
	 * 
	 * From state.js, when a user is successfully
	 * logged in, a session cookie will be created 
	 * to be used by the server.
	 * 
	 */
	res.setHeader(
		'Set-Cookie',
		cookie.serialize('token', req.body.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			maxAge: 60 * 60,
			sameSite: 'strict',
			path: '/',
		})
	)
	res.statusCode = 200
	res.json({ success: true })
}