import { Router, Request, Response } from 'express'
import showProfile from '../controllers/profile/profile'
import resetPassword from '../controllers/profile/resetPassword'

const profileRouter = Router()

profileRouter.get('/getProfile', (req: Request, res: Response) => {
	showProfile(req, res)
})

profileRouter.patch('/resetPassword', async (req: Request, res: Response) => {
	resetPassword(req, res)
})

export default profileRouter
