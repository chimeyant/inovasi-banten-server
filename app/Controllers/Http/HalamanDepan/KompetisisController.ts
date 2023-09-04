import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KompetisiService from 'App/Services/Permohonan/KompetisiService'

export default class KompetisisController {
  protected Service = KompetisiService

  public async index({}: HttpContextContract) {
    const result = await this.Service.lists()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
