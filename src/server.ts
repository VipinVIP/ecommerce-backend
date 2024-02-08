import express, { Express, Request, Response } from 'express'
import EcSuppliers from './models/ec_suppliers.ts'
import { sequelize } from './config/sequelize_config.ts'
import indexRoutes from './routes/index.ts'
import supplierRoutes from './routes/supplierRoutes.ts'

const app: Express = express()

sequelize
	.sync({ force: false })
	.then(() => {
		console.log('DB Synced')
	})
	.catch((err: any) => {
		console.log('An error occured', err)
	})

app.use(express.json())

app.use(indexRoutes)
app.use('/api/v1', supplierRoutes)

app.listen(3000, () => {
	console.log(`Server started successfully on PORT 3000`)
})
