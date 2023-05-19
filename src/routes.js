import { Router } from 'express'
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/login', LoginController.store)

export default routes
