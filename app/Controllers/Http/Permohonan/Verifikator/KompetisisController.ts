import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryService from 'App/Services/MasterData/CategoryService'
import InovationService from 'App/Services/Permohonan/InovationService'

export default class KompetisisController {
  protected Service = InovationService
  protected CategorySvc = CategoryService

  public async index({auth}: HttpContextContract) {
    const user = auth.user

    const category = await this.CategorySvc.showByCode("KMP")

    const payload ={
      user: user,
      category: category
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
