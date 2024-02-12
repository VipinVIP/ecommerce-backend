import express, { Express } from 'express'
import { sequelize } from './config/sequelize_config.ts'
import authRouter from './routes/authRoutes.ts'
import planRouter from './routes/planRoutes.ts'
import profileRouter from './routes/profileRoutes.ts'

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

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/plans', planRouter)
app.use('/api/v1/profile', profileRouter)

app.listen(3000, () => {
	console.log(`Server started successfully on PORT 3000`)
})
