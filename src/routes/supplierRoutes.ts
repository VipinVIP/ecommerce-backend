import resetPassword from '../controllers/authentication/resetPassword'
import showSupplierProfile from '../controllers/authentication/supplierProfile'
import { Router, Request, Response } from 'express'

const supplierRouter = Router()

supplierRouter.get('/supplierProfile', (req: Request, res: Response) => {
	showSupplierProfile(req, res)
})

supplierRouter.patch('/resetPassword', async (req: Request, res: Response) => {
	resetPassword(req, res)
})

export default supplierRouter
