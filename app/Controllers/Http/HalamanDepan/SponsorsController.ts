import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SponsorService from 'App/Services/HalamanDepan/SponsorService'

export default class SponsorsController {
  public async index({}: HttpContextContract) {
    const result = await SponsorService.lists()

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['name','logo','website','status'])

    //validator
    const  result = await SponsorService.store(payload)

    return response.status(result?.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await SponsorService.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['name','logo','website', 'status'])

    const result = await SponsorService.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await SponsorService.delete(params.id)

    return response.status(result.code).send(result)
  }

  public async publicshow({}:HttpContextContract){
    const result = await SponsorService.publiclists()

    return result;
  }
}
