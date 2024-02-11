import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import EcSuppliers from '../../models/ec_suppliers'
import jwt from 'jsonwebtoken'
import EcCustomers from '../../models/ec_customers'
import EcSuperAdmin from '../../models/ec_superAdmin'

const login = async (
	req: Request,
	res: Response
): Promise<Response<number>> => {
	const { e_mail, password, user_type } = req.body

	if (!e_mail || !password) {
		return res.status(422).send('Not all required properties sent to me')
	}

	if (user_type === 'supplier') {
		const foundValue = await EcSuppliers.findOne({
			where: { e_mail: e_mail },
			raw: true,
		})
		if (foundValue && bcrypt.compareSync(password, foundValue?.password)) {
			const token = jwt.sign(
				{ registration_id: foundValue.registration_id, user_type },
				'supplier_secret_key',
				{ expiresIn: '24h' }
			)
			return res.status(200).json({
				token: token,
				message: `Welcome ${foundValue.full_name}. You are a ${user_type}`,
			})
		}
		return res.status(401).json(`No Supplier with these parameters found`)
	} else if (user_type === 'customer') {
		const foundValue = await EcCustomers.findOne({
			where: { e_mail: e_mail },
			raw: true,
		})
		if (foundValue && bcrypt.compareSync(password, foundValue?.password)) {
			const token = jwt.sign(
				{ registration_id: foundValue.registration_id, user_type },
				'customer_secret_key',
				{ expiresIn: '24h' }
			)
			return res.status(200).json({
				token: token,
				message: `Welcome ${foundValue.full_name}. You are a ${user_type}`,
			})
		}
		return res.status(401).json(`No Customer with these parameters found`)
	} else if (user_type === 'super admin') {
		const foundValue = await EcSuperAdmin.findOne({
			where: { e_mail: e_mail },
			raw: true,
		})
		if (foundValue && bcrypt.compareSync(password, foundValue?.password)) {
			const token = jwt.sign(
				{ user_reg_id: foundValue.id, user_type },
				'superadmin_secret_key',
				{ expiresIn: '24h' }
			)
			return res.status(200).json({
				token: token,
				message: `Welcome ${foundValue.full_name}. You are a ${user_type}`,
			})
		}
		return res.status(401).json(`No Super Admin with these parameters found`)
	} else return res.status(401).json(`Supplier,Customer,SupAdm onnum alla`)
}

export default login
