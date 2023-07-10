import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DoctorService from 'App/Controllers/Services/MasterData/DoctorService'

export default class DoctorsController {
  public async index({}: HttpContextContract) {
    const doctors = await DoctorService.lists()

    return doctors

  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['code','name'])

    const result = await DoctorService.store(payload)

    return response.status(200).send(result)
  }

  public async show({params, response}: HttpContextContract) {
    const result = await DoctorService.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['code','name'])

    const result = await DoctorService.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await DoctorService.delete(params.id)

    return response.status(result.code).send(result)
  }

  public async combo({}:HttpContextContract){
    const result = await DoctorService.combo()

    return result
  }
}
