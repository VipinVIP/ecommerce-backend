import { Model } from 'sequelize'

class EcSubscriptionPlans extends Model {
	public id?: number
	public subscription_name!: string
	public fee!: number
	public no_of_customers!: number
	public createdAt?: Date
	public updatedAt?: Date
}

export { EcSubscriptionPlans }
