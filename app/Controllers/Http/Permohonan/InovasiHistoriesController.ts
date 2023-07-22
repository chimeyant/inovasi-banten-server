import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InovasiHistoryService from 'App/Services/Permohonan/InovasiHistoryService'

export default class InovasiHistoriesController {
  public async index({params}: HttpContextContract) {
    const result = await InovasiHistoryService.lists(params.inovasi_uuid)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
