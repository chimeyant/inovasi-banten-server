import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Visualization from 'App/Models/Visualization'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class VisualisasisController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params, response}: HttpContextContract) {
    const {visualization_uuid}= params

    const visualisasi = await Visualization.findBy("uuid", visualization_uuid)

    const data ={}
    data['name'] = visualisasi?.name
    data['thumbnail']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/visualizations/"+ visualisasi?.thumbnail)

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
