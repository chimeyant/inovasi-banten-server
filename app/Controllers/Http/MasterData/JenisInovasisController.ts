import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JenisInovasiService from 'App/Controllers/Services/MasterData/JenisInovasiService'

export default class JenisInovasisController {
  public async index({}: HttpContextContract) {
    const result = await JenisInovasiService.lists()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['name','status'])

    const result = await JenisInovasiService.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await JenisInovasiService.show(params.id)

    return result;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['name','status'])

    const result =await JenisInovasiService.update(payload,params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await JenisInovasiService.delete(params.id)

    return response.status(result.code).send(result)
  }
}
