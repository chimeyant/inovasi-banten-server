import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OpdKabkotaService from 'App/Services/MasterData/OpdKabkotaService'

export default class OpdKabkotasController {
  public async index({auth}: HttpContextContract) {
    const user = auth.user
    const result = await OpdKabkotaService.lists(user?.regencyCode)
    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async combo({auth}:HttpContextContract){
    const user = auth.user

    const result = await OpdKabkotaService.combo(user?.regencyCode)

    return result;
  }
}
