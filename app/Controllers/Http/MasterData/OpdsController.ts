import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OpdService from 'App/Services/MasterData/OpdService'

export default class OpdsController {
  public async index({}: HttpContextContract) {
    const result = await OpdService.lists()
    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['code','name'])

    const result = await OpdService.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await OpdService.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['code','name'])

    const result = await OpdService.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await OpdService.delete(params.id)

    return response.status(result.code).send(result)
  }

  public async combo({}:HttpContextContract){
    const  result = await OpdService.combo()

    return result
  }

  public async combobyregency({params}:HttpContextContract){
    const result = await OpdService.comboByRegency(params.regency_code)
    return result;
  }

  public async generate({request,response}:HttpContextContract){
    const {regency_code} =request.all()

    const result = await OpdService.generate(regency_code)

    return response.status(result.code).send(result)
  }


}
