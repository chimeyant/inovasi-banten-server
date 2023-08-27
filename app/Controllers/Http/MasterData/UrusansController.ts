import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UrusanService from 'App/Services/MasterData/UrusanService'

export default class UrusansController {
  protected Service = UrusanService
  public async index({}: HttpContextContract) {
    const result = await UrusanService.lists()

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['name','img','status'])

    const result = await this.Service.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await this.Service.show(params.id)

    return result;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['name','img','status'])

    const result = await this.Service.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await this.Service.delete(params.id)

    return response.status(result.code).send(result)
  }

  public async combo({}:HttpContextContract){
    const result = await UrusanService.combo()

    return result
  }
}
