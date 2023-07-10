import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProblemService from 'App/Controllers/Services/MasterData/ProblemService'
import ProblemValidator from 'App/Validators/MasterData/ProblemValidator';

export default class ProblemsController {
  public async index({}: HttpContextContract) {
    const datas =  ProblemService.list()

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['category_uuid','code', 'name'])

    await request.validate(ProblemValidator)

    const result = await ProblemService.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await ProblemService.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request,response}: HttpContextContract) {
    const payload = request.only(['category_uuid','code','name'])

    await request.validate(ProblemValidator)

    const result = await ProblemService.update(payload, params.id)

    return response.status(result.code).send(result)

  }

  public async destroy({params}: HttpContextContract) {
    const result = await ProblemService.delete(params.id)

    return result
  }
}
