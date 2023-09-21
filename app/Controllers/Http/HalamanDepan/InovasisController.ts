import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RepositoryInovationService from 'App/Services/HalamanDepan/RepositoryInovationService'
import InovasiService from 'App/Services/Permohonan/InovasiService'
import SinovicService from 'App/Services/Permohonan/SinovicService'

export default class InovasisController {
  protected Service = RepositoryInovationService
  protected SinovicSvc= SinovicService
  protected IgaSvc = InovasiService

  public async index({}: HttpContextContract) {
    const result = await this.Service.lists()

    return result
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
