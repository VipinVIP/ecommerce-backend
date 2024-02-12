import { Router, Request, Response, NextFunction } from 'express'
import login from '../controllers/authentication/login'
import register from '../controllers/authentication/register'
import getSubScriptionPlans from '../controllers/authentication/getPlans'

const router = Router()

router.post('/registration', async (req: Request, res: Response) => {
	register(req, res)
})

router.post('/login', (req: Request, res: Response) => {
	login(req, res)
})
router.get('/getPlans', (req: Request, res: Response) => {
	getSubScriptionPlans(req, res)
})

export default router
