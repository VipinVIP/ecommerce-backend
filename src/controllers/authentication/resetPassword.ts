import { Request, Response } from 'express'
import EcSuppliers from '../../models/ec_suppliers'

const resetPassword = async (req: Request, res: Response) => {
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
}

export default resetPassword
