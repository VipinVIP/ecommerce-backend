import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const verifyTokenMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let token = req.headers.authorization

	const { user_type } = req.method == 'GET' ? req.query : req.body
	if (!token) {
		return res.status(500).send(`Error happened. No token`)
	}
	token = token?.split('Bearer ')[1]

	// Infer relevent secret key from user type
	let secret_key: string = ''
	if (user_type == 'supplier') {
		secret_key = 'supplier_secret_key'
	} else if (user_type == 'customer') {
		secret_key = 'customer_secret_key'
	} else if (user_type == 'super admin') {
		secret_key = 'superadmin_secret_key'
	}
	//-----------------------------------------------

	jwt.verify(token as string, secret_key, (err, decoded) => {
		if (err) {
			return res.status(401).send(`Error happened. ${err}`)
		}

		req.body.jwt_decoded = decoded
		next()
	})
}

export default verifyTokenMiddleware
