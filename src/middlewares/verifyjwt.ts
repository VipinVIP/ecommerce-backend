import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const verifyTokenMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let token = req.headers.authorization
	if (!token) {
		return res.status(500).send(`Error happened. No token`)
	}
	token = token?.split('Bearer ')[1]

	jwt.verify(token as string, "vipi's secret", (err, decoded) => {
		if (err) {
			return res.status(401).send(`Error happened. ${err}`)
		}

		req.body.jwt_decoded = decoded
		next()
	})
}

export default verifyTokenMiddleware
