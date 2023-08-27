import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InidkatorService from 'App/Services/MasterData/InidkatorService'

export default class IndikatorsController {
  public async index({params}: HttpContextContract) {
    const result = await InidkatorService.lists(params.category_uuid)

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({params,request, response}: HttpContextContract) {
    const payload = request.only(['name','skor','optional','status'])

    const result = await InidkatorService.store(payload, params.category_uuid)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await InidkatorService.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params,request, response}: HttpContextContract) {
    const payload = request.only(['name','skor','optional','status'])

    const result = await InidkatorService.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await InidkatorService.delete(params.id)

    return response.status(result.code).send(result)
  }
}
