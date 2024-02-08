import EcSuppliers from '../models/ec_suppliers'
import { Router, Request, Response } from 'express'

const supplierRouter = Router()

supplierRouter.get('/supplierProfile', async (req: Request, res: Response) => {
	try {
		const { user_type, registration_id } = req.query

		if (!user_type || !registration_id) {
			res.status(422).send('Not all required properties sent to me')
		}
		const foundValue = await EcSuppliers.findOne({
			where: { registration_id: registration_id },
			raw: true,
		})
		console.log(foundValue)
		if (foundValue != null) {
			return res.status(200).json(`Welcome ${JSON.stringify(foundValue)}`)
		}
		return res.status(401).json(`No record with these parameters found`)
	} catch (error: any) {
		res.status(500).send(`Error happened. Error is ${error.toString()}`)
	}
})

supplierRouter.patch('/resetPassword', async (req: Request, res: Response) => {
	try {
		const { e_mail, new_password, user_type } = req.body
		if (!e_mail || !new_password) {
			res.status(422).send('Not all required properties sent to me')
		}
		const foundValue = await EcSuppliers.update(
			{ password: new_password },
			{ where: { e_mail: e_mail } }
		)
		console.log(foundValue)
		if (foundValue != null) {
			return res.status(200).json(`password changed.`)
		}
		return res.status(401).json(`Supplier alla`)
	} catch (error: any) {
		res.status(500).send(`Error happened. Error is ${error.toString()}`)
	}
})

export default supplierRouter
