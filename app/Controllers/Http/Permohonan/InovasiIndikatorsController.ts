import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InovasiIndikatorService from 'App/Services/Permohonan/InovasiIndikatorService'

export default class InovasiIndikatorsController {
  public async index({params}: HttpContextContract) {
    const {inovasi_uuid} = params

    const result = await InovasiIndikatorService.lists(inovasi_uuid)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
