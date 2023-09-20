import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InovationService from 'App/Services/Permohonan/InovationService'

export default class InovasisController {
  protected Service = InovationService

  public async index({auth}: HttpContextContract) {
    const user = auth.user

    const payload ={
      user:user,
      category:{}
    }

    const result = await this.Service.lists(payload)

    return result


  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
