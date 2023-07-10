import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProclistService from 'App/Controllers/Services/MasterData/ProclistService'

export default class ProclistsController {
  public async index({request}: HttpContextContract) {
    const result = await ProclistService.list(request)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
