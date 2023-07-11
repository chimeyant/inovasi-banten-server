import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProvinceService from 'App/Services/MasterData/ProvinceService'

export default class ProvincesController {
  public async index({}: HttpContextContract) {
    const result = await ProvinceService.list()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params, response}: HttpContextContract) {
    const result = await ProvinceService.show(params.id)

    return result

  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
