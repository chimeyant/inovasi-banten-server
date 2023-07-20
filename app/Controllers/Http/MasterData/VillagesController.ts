import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VillageService from 'App/Services/MasterData/VillageService'

export default class VillagesController {
  public async index({params}: HttpContextContract) {
    const {district_code}= params

    const result = await VillageService .lists(district_code)

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async combo({params}:HttpContextContract){
    const result = await VillageService.combo(params.district_code)

    return result
  }
}
