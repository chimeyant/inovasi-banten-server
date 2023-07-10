import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Infograpich from 'App/Models/Infograpich'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class InfografisController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params, response}: HttpContextContract) {
    const {infographic_uuid}= params

    const infografis = await Infograpich.findBy("uuid", infographic_uuid)
    const data ={}
    data['name'] = infografis?.name
    data['thumbnail']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/infographic/"+ infografis?.thumbnail)

    return response.status(200).json({
      success:true,
      code:200,
      message:'sukses',
      data: data
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
