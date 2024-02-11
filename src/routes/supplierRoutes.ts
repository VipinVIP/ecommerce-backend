import resetPassword from '../controllers/authentication/resetPassword'
import showProfile from '../controllers/authentication/profile'
import { Router, Request, Response } from 'express'

const supplierRouter = Router()

supplierRouter.get('/profile', (req: Request, res: Response) => {
	showProfile(req, res)
})

supplierRouter.patch('/resetPassword', async (req: Request, res: Response) => {
	resetPassword(req, res)
})

export default supplierRouter
