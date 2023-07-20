import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BentukService from 'App/Services/MasterData/BentukService'

export default class BentuksController {
  public async index({}: HttpContextContract) {
    const result = await BentukService.lists()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['name','status'])

    const result = await BentukService.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await BentukService.show(params.id)

    return result;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['name','status'])

    const result = await BentukService.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await BentukService.delete(params.id)

    return response.status(result.code).send(result)
  }

  public async combo({}:HttpContextContract){
    const result= await BentukService.combo()
    return result
  }
}
