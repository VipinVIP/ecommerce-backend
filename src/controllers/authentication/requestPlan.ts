import { Request, Response } from 'express'
import EcSuperAdmin from '../../models/ec_superAdmin'
import EcSubscriptionPlans from '../../models/ec_subscriptionPlans'
import EcSuppliers from '../../models/ec_suppliers'

const requestSubscriptionPlan = async (req: Request, res: Response) => {
	try {
		const { e_mail, user_type, subscription_id } = req.body
		if (!e_mail || !user_type) {
			res.status(422).send('Not all required properties sent to me')
		}
		if (user_type == 'supplier') {
			const foundSupplier = await EcSuppliers.findOne({
				where: { e_mail: e_mail },
				raw: true,
			})

			const foundPlan = await EcSubscriptionPlans.findOne({
				where: { id: subscription_id },
				raw: true,
			})

			if (foundSupplier != null && foundPlan != null) {
				let addedPlan = await EcSuppliers.update(
					{ purchased_plan_id: foundPlan.id },
					{ where: { e_mail: e_mail } }
				)
				return res
					.status(401)
					.json(`Request to add ${foundPlan.subscription_name} accepted.`)
			} else {
				return res.status(401).json(`Either supplier or plan doesnt exist`)
			}
		}
	} catch (err: any) {
		return res.status(401).json(`Error: ${err.toString()}`)
	}
}
export default requestSubscriptionPlan
