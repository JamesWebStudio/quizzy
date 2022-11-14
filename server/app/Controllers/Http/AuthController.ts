import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Database from '@ioc:Adonis/Lucid/Database'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from '../../Models/user'

const user = {
  id: '',
  username: '',
  token: {}
}

export default class AuthController {
  public async Signin({request, response, auth} :  HttpContextContract)  {
    const password = await request.input('password')
    const email = await request.input('email')
    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '24hours',
      })
      user.id = token.user.id
      user.username = token.user.$extras.username
      user.token = {...token.toJSON()}
      return user
    } 
    catch {
      return response
        .status(400)
        .send({ error: { message: 'User could not be found' } })
    }
  }

  public async Register({request, response} : HttpContextContract) {
    // validate
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      lastname: schema.string({}),  // , [rules.confirmed()]
      firstname: schema.string({}),  // , [rules.confirmed()]
      password: schema.string({}),  // , [rules.confirmed()]
      username: schema.string({}, [rules.unique({ table: 'users', column: 'username' })]),
    })
    const data = await request.validate({ schema: validations })
    const user = await User.create(data)
    return response.created(user)
  }

  public async Logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200)
  }
}
