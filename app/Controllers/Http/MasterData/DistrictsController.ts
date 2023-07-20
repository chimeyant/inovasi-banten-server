import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DistrictService from 'App/Services/MasterData/DistrictService'

export default class DistrictsController {
  public async index({params}: HttpContextContract) {
    const {regency_code} = params

    const result = await DistrictService.lists(regency_code)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async combo({params}:HttpContextContract){
    const result = await DistrictService.combo(params.regency_code)
    return result;
  }
}
