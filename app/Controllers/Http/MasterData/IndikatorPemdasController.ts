import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IndikatorPemdaService from 'App/Services/MasterData/IndikatorPemdaService'

export default class IndikatorPemdasController {
  public async index({}: HttpContextContract) {
    const result = await IndikatorPemdaService.lists()

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['category_uuid','name','skor','status'])

    const result = await IndikatorPemdaService.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await IndikatorPemdaService.show(params.id)

    return result;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['category_uuid','name','skor','status'])

    const result = await IndikatorPemdaService.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result =await IndikatorPemdaService.delete(params.id)

    return response.status(result.code).send(result)
  }
}
