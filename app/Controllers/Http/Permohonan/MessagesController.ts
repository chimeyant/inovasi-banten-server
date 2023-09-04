import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MessageService from 'App/Services/Permohonan/MessageService';


export default class MessagesController {
  protected Service = MessageService
  public async index({auth}: HttpContextContract) {
    const user = await auth.user
    const result = await this.Service.litst(user)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response, auth}: HttpContextContract) {
    const user = auth.user

    const {title, body} = request.all()

    const payload={
      from_user_uuid: user?.id,
      to_user_uuid: null,
      title: title,
      body: body
    }

    const result = await this.Service.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({params, response}: HttpContextContract) {
    const result = await this.Service.delete(params.id)

    return response.status(result.code).send(result)
  }
}
