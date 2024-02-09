import express, { Express, NextFunction, Request, Response } from 'express'
import EcSuppliers from './models/ec_suppliers.ts'
import { sequelize } from './config/sequelize_config.ts'
import indexRoutes from './routes/index.ts'
import supplierRoutes from './routes/supplierRoutes.ts'
import verifyTokenMiddleware from './middlewares/verifyjwt.ts'

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

const middleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.headers['x-api-key'] == 'Hello') {
		res.setHeader('Set-Cookie', ['name=VIPIN K P', 'Age=23', 'Role=SuperUser'])
		next()
	} else {
		return res.status(500).send(`Error happened. No x-Api-key`)
	}
}

app.use('/index', indexRoutes)
app.use('/api/v1', verifyTokenMiddleware, supplierRoutes)

app.listen(3000, () => {
	console.log(`Server started successfully on PORT 3000`)
})
