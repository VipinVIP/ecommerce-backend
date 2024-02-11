import { Request, Response } from 'express'
import EcSuppliers from '../../models/ec_suppliers'
import EcCustomers from '../../models/ec_customers'
import EcSuperAdmin from '../../models/ec_superAdmin'

const showProfile = async (req: Request, res: Response) => {
	try {
		const { user_type, registration_id } = req.query
		console.log(user_type)
		if (!user_type || !registration_id) {
			res.status(422).send('Not all required properties sent to me')
		}
		let foundValue
		if (user_type == 'supplier') {
			foundValue = await EcSuppliers.findOne({
				where: { registration_id: registration_id },
				raw: true,
			})
		} else if (user_type == 'customer') {
			foundValue = await EcCustomers.findOne({
				where: { registration_id: registration_id },
				raw: true,
			})
		} else if (user_type == 'super admin') {
			foundValue = await EcSuperAdmin.findOne({
				where: { registration_id: registration_id },
				raw: true,
			})
		}

		if (foundValue != null) {
			const responsString = `${foundValue.full_name}
			Email: ${foundValue.e_mail}
			Profile Picture: ${foundValue.profile_pic}
			Registration ID: ${foundValue.registration_id}
			User Type: ${user_type}
			`

			return res.status(200).send(`Welcome ${responsString}`)
		} else return res.status(401).json(`No record with these parameters found`)
	} catch (error: any) {
		res.status(500).send(`Error happened. Error is ${error.toString()}`)
	}
}

export default showProfile
