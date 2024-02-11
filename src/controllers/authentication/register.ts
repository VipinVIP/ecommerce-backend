import { Request, Response } from 'express'
import EcSuppliers from '../../models/ec_suppliers'
import EcCustomers from '../../models/ec_customers'
import EcSuperAdmin from '../../models/ec_superAdmin'

const register = async (req: Request, res: Response) => {
	try {
		const {
			full_name,
			e_mail,
			password,
			user_type,
			profile_pic = 'https://avatars.githubusercontent.com/u/58673683?v=4',
		} = req.body

		if (!full_name || !e_mail || !password) {
			res.status(422).send('Not all required properties sent to me')
		}
		if (user_type === 'supplier') {
			const newSupplier = await EcSuppliers.create(
				{
					full_name: full_name,
					e_mail: e_mail,
					password: password,
					profile_pic: profile_pic,
				},
				{ raw: true }
			)
			res
				.status(200)
				.json(
					`Hi ${full_name},Your Reg.ID is ${newSupplier.dataValues.registration_id}`
				)
		} else if (user_type === 'customer') {
			const newCustomer = await EcCustomers.create(
				{
					full_name: full_name,
					e_mail: e_mail,
					password: password,
					profile_pic: profile_pic,
				},
				{ raw: true }
			)
			res
				.status(200)
				.json(
					`Hi ${full_name},Your Reg.ID is ${newCustomer.dataValues.registration_id}`
				)
		} else if (user_type === 'super admin') {
			const newSuperAdmin = await EcSuperAdmin.create(
				{
					full_name: full_name,
					e_mail: e_mail,
					password: password,
					profile_pic: profile_pic,
					registration_id: 1,
				},
				{ raw: true }
			)
			res
				.status(200)
				.json(
					`Hi ${full_name},Your Reg.ID is ${newSuperAdmin.dataValues.registration_id}`
				)
		} else {
			return res.status(401).json(`Supplier um Customer um Admin um alla`)
		}
	} catch (error: any) {
		res.status(500).send(`Error happened. Error is ${error.toString()}`)
	}
}

export default register
