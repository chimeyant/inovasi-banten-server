import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegencyService from 'App/Services/MasterData/RegencyService';

export default class RegenciesController {
  public async index({params}: HttpContextContract) {
    const {province_code} = params

    const result = await RegencyService.lists(province_code)

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params}: HttpContextContract) {

  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {



  }

  public async destroy({}: HttpContextContract) {}

  public async combo({}:HttpContextContract){
    const result = await RegencyService.combo()
    return result
  }


}
