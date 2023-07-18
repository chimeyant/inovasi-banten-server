import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UrusanService from 'App/Services/MasterData/UrusanService'

export default class UrusansController {
  public async index({}: HttpContextContract) {
    const result = await UrusanService.lists()

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
