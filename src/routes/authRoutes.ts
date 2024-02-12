import { Router, Request, Response } from 'express'
import register from '../controllers/authentication/register'
import login from '../controllers/authentication/login'

const authRouter = Router()

authRouter.post('/registration', async (req: Request, res: Response) => {
	register(req, res)
})

authRouter.post('/login', (req: Request, res: Response) => {
	login(req, res)
})

export default authRouter
