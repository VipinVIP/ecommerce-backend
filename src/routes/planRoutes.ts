import { Router, Request, Response } from 'express'
import getSubScriptionPlans from '../controllers/plans/getPlans'
import requestSubscriptionPlan from '../controllers/plans/requestPlan'
import addSubscriptionPlan from '../controllers/plans/addPlan'

const planRouter = Router()

planRouter.post('/addPlan', (req: Request, res: Response) => {
	addSubscriptionPlan(req, res)
})

planRouter.patch('/requestPlan', (req: Request, res: Response) => {
	requestSubscriptionPlan(req, res)
})

planRouter.get('/getPlans', (req: Request, res: Response) => {
	getSubScriptionPlans(req, res)
})

export default planRouter
