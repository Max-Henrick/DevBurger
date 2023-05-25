import * as Yup from 'yup'
import Category from '../models/Category'

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error.errors })
    }

    const { name } = request.body

    const validateCategory = await Category.findOne({
      where: { name },
    })

    if (validateCategory) {
      return response.status(400).json({ Error: 'Categoria já cadastrada' })
    }

    const { id } = await Category.create({ name })

    return response.json({ id, name })
  }

  async index(request, response) {
    const categories = await Category.findAll()

    return response.json(categories)
  }
}

export default new CategoryController()