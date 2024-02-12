import { Request, Response } from 'express'
import EcSuperAdmin from '../../models/ec_superAdmin'
import EcSubscriptionPlans from '../../models/ec_subscriptionPlans'

const addSubscriptionPlan = async (req: Request, res: Response) => {
	try {
		const { e_mail, user_type, subscription_name, fee, no_of_customers } =
			req.body
		if (!e_mail || !user_type) {
			res.status(422).send('Not all required properties sent to me')
		}
		if (user_type == 'super admin') {
			const foundValue = await EcSuperAdmin.findOne({
				where: { e_mail: e_mail },
				raw: true,
			})

			if (foundValue != null) {
				const newPlan = await EcSubscriptionPlans.create(
					{
						subscription_name,
						fee,
						no_of_customers,
					},
					{ raw: true }
				)
				console.log(newPlan)
				if (newPlan != null) {
					return res
						.status(200)
						.json(`plan ${subscription_name} created successfully`)
				} else {
					return res.status(401).json(`SupAdm onnum alla`)
				}
			} else {
				return res.status(401).json(`SupAdm onnum alla`)
			}
		}
	} catch (err: any) {
		return res.status(401).json(`Error: ${err.toString()}`)
	}
}
export default addSubscriptionPlan
