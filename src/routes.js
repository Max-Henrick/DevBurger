import { Router } from 'express'

const routes = new Router()

routes.get('/', (resquest, response) => {
  return response.json({ mensagen: 'Hello word' })
})

export default routes
