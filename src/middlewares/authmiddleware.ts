import { Request, Response, NextFunction } from 'express'

const middleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.headers['x-api-key'] == 'Hello') {
		res.setHeader('Set-Cookie', ['name=VIPIN K P', 'Age=23', 'Role=SuperUser'])
		next()
	} else {
		return res.status(500).send(`Error happened. No x-Api-key`)
	}
}
