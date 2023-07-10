import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"
import DownloadCounter from 'App/Helpers/DownloadCounter'

export default class DocumentsController {
  public async index({response}: HttpContextContract) {
    const documents = await Document.query().preload('topic').preload('downloads').preload('organization').orderBy("id",'desc').paginate()

    const datas:{}[]=[]

    const meta = documents.getMeta()

    documents.forEach(async element => {
      const row ={}
      row['id']= element.uuid
      row['title']= element.name
      row['icon']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/"+ element.topic?.icon)
      row['download']=  Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ element.filename)
      row['opd'] = element.organization.name
      row['topik']= element.topic?.name
      row['counter']= element.downloads.length
      datas.push(row)
    });

    return response.status(200).json({
      success:true,
      code :200,
      message:"sukses",
      data: datas,
      meta:meta
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async download({params, response, request}:HttpContextContract){
    const {id}= params

    try {
      const document = await Document.findBy("uuid",id)
      const url = Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ document?.filename)

      //add counter download
      await DownloadCounter.store(id, document?.groupDataUuid, document?.topicUuid, request.ip())

      return response.status(200).json({
        code:200,
        success:true,
        message:"successed",
        url:url
      })

    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        message:"Opps..., terjadi kesalahan ",
        errors:error
      })
    }


  }
}
