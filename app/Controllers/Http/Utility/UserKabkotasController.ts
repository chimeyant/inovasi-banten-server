import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserKabkotaService from 'App/Services/Utility/UserKabkotaService'

export default class UserKabkotasController {
  public async index({request, auth}: HttpContextContract) {
    const user = auth.user

    const result = await UserKabkotaService.lists(request, user?.regencyCode)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response,auth}: HttpContextContract) {
    const user = auth.user
    const {name, email, phone,opd_uuid, status}= request.all()

    const payload = {
      name: name,
      email:email,
      phone:phone,
      opd_uuid:opd_uuid,
      status:status,
      regency_code:user?.regencyCode
    }

    const result = await UserKabkotaService.store(payload, user.id)

    return response.status(result.code).send(result)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
