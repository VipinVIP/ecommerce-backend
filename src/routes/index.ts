import { Router, Request, Response, NextFunction } from 'express'
import login from '../controllers/authentication/login'
import register from '../controllers/authentication/register'

const router = Router()

router.post('/registration', async (req: Request, res: Response) => {
	register(req, res)
})

router.post('/login', (req: Request, res: Response) => {
	login(req, res)
})

export default router
