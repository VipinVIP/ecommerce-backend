import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../config/sequelize_config.ts'
import { EcSuperAdmin } from '../../types/modelTypes/ec_superAdmin.ts'
import bcrypt from 'bcrypt'

EcSuperAdmin.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		full_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		e_mail: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		profile_pic: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		registration_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		registration_time_stamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
		modelName: 'ec_super_admin',
		tableName: 'ec_super_admin',
		hooks: {
			beforeCreate: (user: EcSuperAdmin) => {
				const hashedPassword = bcrypt.hashSync(
					user.password,
					bcrypt.genSaltSync(10)
				)
				user.password = hashedPassword
			},
			beforeUpdate: (user: EcSuperAdmin) => {
				const hashedPassword = bcrypt.hashSync(
					user.password,
					bcrypt.genSaltSync(10)
				)
				user.password = hashedPassword
			},
		},
	}
)

export default EcSuperAdmin
