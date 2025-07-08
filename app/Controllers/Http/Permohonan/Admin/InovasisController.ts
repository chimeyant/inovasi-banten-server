import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InovationService from 'App/Services/Permohonan/InovationService'
import SinovicService from 'App/Services/Permohonan/SinovicService'

export default class InovasisController {
  protected Service = InovationService
  protected SinovicSvc = SinovicService

  public async index({auth, params}: HttpContextContract) {
    const tahun = params.tahun || '2025'
    const user = auth.user


    const datas =[]

    const payload ={
      user:user,
      category:{},
      tahun:tahun
    }

    const result = await this.Service.lists(payload)

    const result2 = await this.SinovicSvc.lists(user)

    const final_result = result?.concat(result2)

    return final_result
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
