import { v4 } from 'uuid'
import * as Yup from 'yup'
import User from '../models/User'

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error.errors })
    }

    const { name, email, password, admin } = request.body

    const validateEmail = await User.findOne({
      where: { email },
    })

    if (validateEmail) {
      return response.status(400).json({ Error: 'Email já cadastrado' })
    }

    const user = User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    })

    return response.status(201).json({ id: user.id, name, email, admin })
  }
}

export default new UserController()
