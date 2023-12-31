import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Superadmin {
  public async handle({response, auth}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    if(auth.user?.authent !== 'superadmin'){
      return response.unauthorized()
    }

    await next()
  }
}
