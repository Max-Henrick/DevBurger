import * as Yup from 'yup'
import User from '../models/User'

class LoginController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    if (!(await schema.isValid(request.body))) {
      return response
        .status(400)
        .json({ error: 'Verifique se email ou senha estão corretos' })
    }
    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      return response
        .status(400)
        .json({ error: 'Verifique se email ou senha estão corretos' })
    }

    if (!(await user.checkPassword(password))) {
      return response
        .status(401)
        .json({ error: 'Verifique se email ou senha estão corretos' })
    }

    return response.json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
    })
  }
}

export default new LoginController()
