import EcSuppliers from '../models/ec_suppliers'
import { Router, Request, Response } from 'express'

const router = Router()

router.post('/registration', async (req: Request, res: Response) => {
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
		}
		return res.status(401).json(`Supplier alla`)
	} catch (error: any) {
		res.status(500).send(`Error happened. Error is ${error.toString()}`)
	}
})

router.post('/login', async (req: Request, res: Response) => {
	const { e_mail, password, user_type } = req.body

	if (!e_mail || !password) {
		res.status(422).send('Not all required properties sent to me')
	}

	if (user_type === 'supplier') {
		const foundValue = await EcSuppliers.findOne({
			where: { e_mail: e_mail, password: password },
			raw: true,
		})
		console.log(foundValue)
		if (foundValue != null) {
			return res.status(200).json(`Welcome ${foundValue.full_name}`)
		}
		return res.status(401).json(`No record with these parameters found`)
	}

	return res.status(401).json(`Supplier alla`)
})

export default router
