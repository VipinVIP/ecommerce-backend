import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../config/sequelize_config.ts'
import { EcSubscriptionPlans } from '../../types/modelTypes/ec_subscriptionPlans.ts'

EcSubscriptionPlans.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		subscription_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fee: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		no_of_customers: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
	},
	{
		sequelize,
		modelName: 'ec_subscription_plans',
		tableName: 'ec_subscription_plans',
	}
)

export default EcSubscriptionPlans
