import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MessageService from 'App/Services/Permohonan/MessageService'

export default class MessagesController {
  public async index({auth}: HttpContextContract) {
    const result = await MessageService.litst(auth.user)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response, auth}: HttpContextContract) {
    const user = auth.user

    let payload = request.only(['to_user_uuid', 'title','body'])
    payload['from_user_uuid']= user?.id

    return payload;

  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
