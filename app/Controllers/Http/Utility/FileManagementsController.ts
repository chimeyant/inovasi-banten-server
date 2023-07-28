import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FileManagementService from 'App/Services/Utility/FileManagementService'

export default class FileManagementsController {
  public async index({}: HttpContextContract) {
    const result = await FileManagementService.list()

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
