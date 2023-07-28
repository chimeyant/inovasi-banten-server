import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Administrator {
  public async handle({response,auth}: HttpContextContract, next: () => Promise<void>) {
    if(auth.user?.authent=="administrator"){
      await next()
    }
    else if(auth.user?.authent=="superadmin"){
      await next()
    }else{
      return response.unauthorized("Unauthorize")
    }
  }
}
