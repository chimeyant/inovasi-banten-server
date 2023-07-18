import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryService from 'App/Controllers/Services/MasterData/CategoryService';
import CategoryValidator from 'App/Validators/MasterData/CategoryValidator';

export default class CategoriesController {
  public async index({}: HttpContextContract) {
    const result = await CategoryService.lists()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['name','status'])

    await request.validate(CategoryValidator)

    const result = await CategoryService.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await CategoryService.show(params.id)

    return result;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['name','status'])

    await request.validate(CategoryValidator)

    const result = await CategoryService.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await CategoryService.delete(params.id)

    return response.status(result.code).send(result)

  }

  public async combo(){
    const result = await CategoryService.combo()

    return result
  }
}
