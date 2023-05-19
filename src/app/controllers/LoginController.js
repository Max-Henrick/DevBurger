import * as Yup from 'yup'
import User from '../models/User'

class LoginController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const validatePasswordOrEmail = () => {
      return response
        .status(401)
        .json({ error: 'Verifique se email ou senha estão corretos' })
    }

    if (!(await schema.isValid(request.body))) validatePasswordOrEmail()

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) validatePasswordOrEmail()

    if (!(await user.checkPassword(password))) validatePasswordOrEmail()

    return response.json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
    })
  }
}

export default new LoginController()
