import { Router } from 'express'
import multer from 'multer'
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'
import ProductController from './app/controllers/ProductController'
import multerConfig from './config/multer'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/login', LoginController.store)
routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

export default routes
