import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InidkatorService from 'App/Controllers/Services/MasterData/InidkatorService'

export default class IndikatorsController {
  public async index({}: HttpContextContract) {
    const result = await InidkatorService.lists()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['category_uuid','name','skor','status'])

    const result = await InidkatorService.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await InidkatorService.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params,request, response}: HttpContextContract) {
    const payload = request.only(['category_uuid','name','skor','status'])

    const result = await InidkatorService.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await InidkatorService.delete(params.id)

    return response.status(result.code).send(result)
  }
}
