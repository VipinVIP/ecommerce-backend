import resetPassword from '../controllers/authentication/resetPassword'
import showProfile from '../controllers/authentication/profile'
import { Router, Request, Response } from 'express'
import addSubscriptionPlan from '../controllers/authentication/addPlan'
import getSubScriptionPlans from '../controllers/authentication/getPlans'
import requestSubscriptionPlan from '../controllers/authentication/requestPlan'

const supplierRouter = Router()

supplierRouter.get('/profile', (req: Request, res: Response) => {
	showProfile(req, res)
})

supplierRouter.patch('/resetPassword', async (req: Request, res: Response) => {
	resetPassword(req, res)
})

supplierRouter.post('/addPlan', (req: Request, res: Response) => {
	addSubscriptionPlan(req, res)
})

supplierRouter.patch('/requestPlan', (req: Request, res: Response) => {
	requestSubscriptionPlan(req, res)
})

export default supplierRouter
