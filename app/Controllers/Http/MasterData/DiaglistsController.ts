import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DiaglistService from 'App/Controllers/Services/MasterData/DiaglistService'
import DiaglistValidator from 'App/Validators/MasterData/DiaglistValidator';

export default class DiaglistsController {
  public async index({request}: HttpContextContract) {
    const result = await DiaglistService.lists(request)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['code','name','status'])

    await request.validate(DiaglistValidator)

    const result = await DiaglistService.store(payload)

    return response.status(result.code).send(result)

  }

  public async show({params}: HttpContextContract) {
    const result = await DiaglistService.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['code','name','status'])

    await request.validate(DiaglistValidator)

    const result = await DiaglistService.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
   const result = await DiaglistService.delete(params.id)

   return response.status(result.code).send(result)
  }
}
