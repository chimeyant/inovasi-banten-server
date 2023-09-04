import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InovasiService from 'App/Services/Permohonan/InovasiService'
import SinovicService from 'App/Services/Permohonan/SinovicService'

export default class InovasisController {
  protected SinovicSvc= SinovicService
  protected IgaSvc = InovasiService

  public async index({}: HttpContextContract) {
    const sinovics = await SinovicService.publicLists()
    return sinovics;
  }

  public async top({}:HttpContextContract){
    const sinovics = await SinovicService.toplists()

    return sinovics;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
