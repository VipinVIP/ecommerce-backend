import { Request, Response } from 'express'
import EcSuppliers from '../../models/ec_suppliers'

const showSupplierProfile = async (req: Request, res: Response) => {
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
}

export default showSupplierProfile
