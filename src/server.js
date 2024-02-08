import express from 'express'
import { ec_suppliers } from './models/ec_suppliers.js'
import { sequelize } from './config/sequelize_config.js'
import { raw } from 'mysql2'

const app = express()

sequelize
	.sync({ force: false })
	.then(() => {
		console.log('DB Synced')
	})
	.catch((err) => {
		console.log('An error occured', err)
	})

app.use(express.json())

app.post('/supplierRegistration', async (req, res) => {
	try {
		const {
			full_name,
			e_mail,
			password,
			profile_pic = 'https://avatars.githubusercontent.com/u/58673683?v=4',
		} = req.body

		if (!full_name || !e_mail || !password) {
			res.status(422).send('Not all required properties sent to me')
		}

		const newSupplier = await ec_suppliers.create(
			{
				full_name: full_name,
				e_mail: e_mail,
				password: password,
				profile_pic: profile_pic,
			},
			{ raw: true }
		)
		// console.log(newSupplier)
		res
			.status(200)
			.json(
				`Hi ${full_name},Your Reg.ID is ${newSupplier.dataValues.registration_id}`
			)
	} catch (error) {
		res.status(500).send(`Error happened. Error is ${error.toString()}`)
	}
})

app.post('/login', async (req, res) => {
	const { e_mail, password, user_type } = req.body

	if (!e_mail || !password) {
		res.status(422).send('Not all required properties sent to me')
	}

	if (user_type === 'supplier') {
		const foundValue = await ec_suppliers.findOne({
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

app.get('/profile', async (req, res) => {
	try {
		const { user_type, registration_id } = req.query

		if (!user_type || !registration_id) {
			res.status(422).send('Not all required properties sent to me')
		}

		if (user_type === 'supplier') {
			const foundValue = await ec_suppliers.findOne({
				where: { registration_id: registration_id },
				raw: true,
			})
			console.log(foundValue)
			if (foundValue != null) {
				return res.status(200).json(`Welcome ${JSON.stringify(foundValue)}`)
			}
			return res.status(401).json(`No record with these parameters found`)
		}
	} catch (error) {}
})

app.patch('/resetPassword', async (req, res) => {
	const { e_mail, new_password, user_type } = req.body

	if (!e_mail || !new_password) {
		res.status(422).send('Not all required properties sent to me')
	}

	if (user_type === 'supplier') {
		const foundValue = await ec_suppliers.update(
			{ password: new_password },
			{ where: { e_mail: e_mail } }
		)
		console.log(foundValue)
		if (foundValue != null) {
			return res.status(200).json(`password changed.`)
		}
		return res.status(401).json(`No record with these parameters found`)
	}

	return res.status(401).json(`Supplier alla`)
})

app.listen(3000, () => {
	console.log(`Server started successfully on PORT 3000`)
})
