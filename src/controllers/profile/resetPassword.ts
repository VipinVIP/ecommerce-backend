import { Request, Response } from 'express'
import EcSuppliers from '../../models/ec_suppliers'
import EcCustomers from '../../models/ec_customers'
import EcSuperAdmin from '../../models/ec_superAdmin'

const resetPassword = async (req: Request, res: Response) => {
	try {
		const { e_mail, new_password, user_type } = req.body
		if (!e_mail || !new_password || !user_type) {
			res.status(422).send('Not all required properties sent to me')
		}
		let foundValue = null
		if (user_type == 'supplier') {
			foundValue = await EcSuppliers.update(
				{ password: new_password },
				{ where: { e_mail: e_mail } }
			)
		} else if (user_type == 'customer') {
			foundValue = await EcCustomers.update(
				{ password: new_password },
				{ where: { e_mail: e_mail } }
			)
		} else if (user_type == 'super admin') {
			foundValue = await EcSuperAdmin.update(
				{ password: new_password },
				{ where: { e_mail: e_mail } }
			)
		}

		console.log(foundValue)
		if (foundValue != null) {
			return res.status(200).json(`password changed.`)
		} else return res.status(401).json(`Supplier alla`)
	} catch (error: any) {
		return res.status(500).send(`Error happened. Error is ${error.toString()}`)
	}
}

export default resetPassword
