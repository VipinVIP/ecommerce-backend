import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import EcSuppliers from '../../models/ec_suppliers'
import jwt from 'jsonwebtoken'

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
				{ user_reg_id: foundValue.id, user_type },
				"vipi's secret",
				{ expiresIn: '24h' }
			)
			return res
				.status(200)
				.json({ token: token, message: `Welcome ${foundValue.full_name}` })
		}
		return res.status(401).json(`No record with these parameters found`)
	}

	return res.status(401).json(`Supplier alla`)
}

export default login
