import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfileIndikatorService from 'App/Services/Permohonan/ProfileIndikatorService'


export default class ProfileIndikatorsController {
  public async index({params}: HttpContextContract) {
    const {profile_uuid} = params

    const result = await ProfileIndikatorService.lists(profile_uuid)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {informasi}= request.all()


    const result = await ProfileIndikatorService.update(informasi, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({}: HttpContextContract) {}
}
