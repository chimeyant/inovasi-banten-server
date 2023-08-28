import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SinovicIndikatorService from 'App/Services/Permohonan/SinovicIndikatorService'

export default class SinovicIndikatorsController {
  protected Service = SinovicIndikatorService
  public async index({params}: HttpContextContract) {
    const result = await this.Service.lists(params.sinovic_uuid)
    if(result.length < 1){
      await this.Service.store(params.sinovic_uuid)

      const resulstore = await this.Service.lists(params.sinovic_uuid)

      return resulstore
    }else{
      return result
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params}: HttpContextContract) {
    const result = await this.Service.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['sinovic_uuid', 'score'])

    const result = await this.Service.update(payload, params.id, params.sinovic_uuid)

    return response.send(result)
  }

  public async destroy({}: HttpContextContract) {}
}
