import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfileService from 'App/Services/Permohonan/ProfileService'

export default class ProfilsController {
  public async index({params}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({auth}: HttpContextContract) {
    const user = auth.user

    const result = await ProfileService.show(user?.opdUuid)

    return result

  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
