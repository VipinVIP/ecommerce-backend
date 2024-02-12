import { Request, Response } from 'express'
import EcSubscriptionPlans from '../../models/ec_subscriptionPlans'

const getSubScriptionPlans = async (req: Request, res: Response) => {
	try {
		const foundValue = await EcSubscriptionPlans.findAll({
			raw: true,
		})
		let responseString = ``
		if (foundValue != null) {
			foundValue.forEach((plan) => {
				responseString += `
                    Subscription ID: ${plan.id}
                    Subscription Name: ${plan.subscription_name}
                    Fee: ${plan.fee}
                    Customers Limit: ${plan.no_of_customers}
                    ------------------------------
                `
			})
			return res.status(200).send(`Here are the plans \n${responseString}`)
		} else {
			return res.status(401).json(`Error: No plans to show`)
		}
	} catch (error: any) {
		return res.status(401).json(`Error: ${error.toString()}`)
	}
}

export default getSubScriptionPlans
