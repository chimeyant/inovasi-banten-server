import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserProvinsiService from 'App/Services/Utility/UserProvinsiService';

export default class UserProvinsisController {
  public async index({request,auth,response}: HttpContextContract) {
    const user = auth.user
    if(user?.authent == 'provinsi'){
      const result = await UserProvinsiService.lists(request, user?.regencyCode)
      return result;
    }else if(user?.authent=='kabkota'){
      const result = await UserProvinsiService.lists(request, user?.regencyCode)
      return result;
    }else{
      return response.forbidden()
    }

  }

  public async create({}: HttpContextContract) {}

  public async store({request, response,auth}: HttpContextContract) {
    const user = auth.user

    if(user?.authent == 'provinsi'){
      const payload = request.only(['name','email', 'phone','opd_uuid','status'])
      const result = await UserProvinsiService.store(payload, user.id)
      return response.status(result.code).send(result)
    }else if(user?.authent=='kabkota'){
      const payload = request.only(['name','email', 'phone','opd_uuid','status'])
      const result = await UserProvinsiService.store(payload, user.id)
      return response.status(result.code).send(result)
    }else{
      return response.forbidden()
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
