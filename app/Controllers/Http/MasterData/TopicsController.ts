import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Topic from 'App/Models/Topic'
import TopicValidator from 'App/Validators/MasterData/TopicValidator';

export default class TopicsController {
  public async index({}: HttpContextContract) {
    const topics = await Topic.query().orderBy("hierarchy","asc")

    const datas:{}[]=[]

    topics.forEach(element => {
      const row ={}
      row['id'] = element.uuid
      row['name']= element.name
      row['icon']= element.icon
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, icon, hierarchy}= request.all()

    await request.validate(TopicValidator)

    try {
      const topic = new Topic
      topic.name = name
      topic.icon = icon
      topic.hierarchy= hierarchy
      await topic.save()

      return response.status(200).json({
        success:true,
        code:200,
        message:"Proses tambah topik berhasil",
        data: topic.dataview
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        message:"Opps..., terjadi kesalahan ",
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params
    const topic = await Topic.findBy("uuid",id)
    return topic?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name, icon, hierarchy}= request.all()

    await request.validate(TopicValidator)

    try {
      const topic = await Topic.findBy("uuid",id)
      topic?.merge({name:name, icon:icon, hierarchy:hierarchy})
      await topic?.save()

      return response.status(200).json({
        success:true,
        code:200,
        message:"Proses ubah data berhasil..!",
        data:topic?.dataview
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        message:"Opps..., terjadi kesalahan ",
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const topic = await Topic.findBy("uuid",id)
      await topic?.delete()

      return response.status(200).json({
        success:true,
        code:200,
        message:"Proses hapus data berhasil...!",
        data:{id:id}
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        message:"Opps..., terjadi kesalahan ",
        errors:error
      })
    }
  }

  public async combo({}:HttpContextContract){
    const topics = await Topic.query().orderBy("hierarchy","asc")

    const datas:{}[]=[]

    topics.forEach(element => {
      const row ={}
      row['text']= element.name
      row['value']= element.uuid
      datas.push(row)
    });

    return datas;
  }
}
