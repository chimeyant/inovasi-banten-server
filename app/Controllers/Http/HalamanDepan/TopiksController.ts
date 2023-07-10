import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Topic from "App/Models/Topic"
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class TopiksController {
  public async index({}: HttpContextContract) {
    const topics = await Topic.query().orderBy("hierarchy",'asc')

    const datas:{}[]=[]
    topics.forEach(async element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['icon']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/"+ element.icon)
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
