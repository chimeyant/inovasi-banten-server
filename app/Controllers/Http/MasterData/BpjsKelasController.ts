import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BpjsKelaService from 'App/Controllers/Services/MasterData/BpjsKelaService'

export default class BpjsKelasController {
  public async index({}: HttpContextContract) {
    const result = await BpjsKelaService.list()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['code','name'])

    const result = await BpjsKelaService.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await BpjsKelaService.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['code','name'])

    const result = await BpjsKelaService.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await BpjsKelaService.delete(params.id)

    return response.status(result.code).send(result)
  }

  public async combo({}:HttpContextContract){
    const result = await BpjsKelaService.combo()

    return result
  }
}
