import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OpdProvinsiService from 'App/Services/MasterData/OpdProvinsiService'

export default class OpdProvinsisController {
  public async index({}: HttpContextContract) {
    const result = await OpdProvinsiService.lists()

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
