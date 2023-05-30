import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'
import ProductController from './app/controllers/ProductController'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/login', LoginController.store)

routes.use(authMiddleware)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store)
export default routes
