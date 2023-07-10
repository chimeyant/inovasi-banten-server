 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Catalog from "App/Models/Catalog"
import Topic from 'App/Models/Topic'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"
import Organization from 'App/Models/Organization'
import GroupDatum from 'App/Models/GroupDatum'
import { DateTime } from 'luxon'

export default class CatalogsController {
  public async index({}:HttpContextContract){

  }

  public async statistik({}:HttpContextContract){
    //cari julmag group statistik
    const groupdata = await GroupDatum.findBy("name","Statistik")

    const jmlstatistik = await Catalog.query().where("group_datat_uuid", groupdata?.uuid).getCount()

    return jmlstatistik

  }

  public async bytopik({params, response}:HttpContextContract){
    const {topic_uuid, itemsPerPage,page,search} = params
    const topic = await Topic.findBy("uuid", topic_uuid)

    const catalogs = await Catalog.query().preload("organization").where("topic_uuid", topic_uuid).paginate(page,itemsPerPage)

    const meta = await catalogs.getMeta()

    const datas:{}[]=[]

    catalogs.forEach(async element => {
      const row = {}
      const datacounters = await element.datacounters
      row['id']= element.uuid
      row['ref_uuid']= element.refUuid
      row['title']= element.title
      row['icon']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/"+ topic?.icon)
      row['opd'] = element.organization.name
      row['topik']= topic?.name
      row['tablename']= element.tablename
      const date1 = DateTime.fromISO(DateTime.now())
      const date2 = DateTime.fromISO(element.createdAt)

      const diff = date1.diff(date2, ["years", "months", "days", "hours"])

      const dateObject = diff.toObject()

      row['dataage']= dateObject.years + ' Tahun ' + dateObject.months + " Bln "+ dateObject.days + " Hari "
      datas.push(row)
    });

    return response.status(200).json({
      code:200,
      message:"Sukses",
      topik: topic?.name,
      data:datas,
      meta: meta
    })
  }

  public async dataset({params, response}:HttpContextContract){
    const {page,itemsPerPage}= params
    const datasets = await Catalog.query().preload('organization').preload("topic").preload('datacounters').where('tablename','dataset').orderBy("created_at","desc").paginate(page,itemsPerPage)

    const meta = await datasets.getMeta()

    const datas:{}[]=[]

    datasets.forEach(async element => {
      const row = {}
      row['id']= element.refUuid
      row['title']= element.title
      row['icon']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/"+ element.topic?.icon)
      row['opd'] = element.organization.name
      row['topik']= element.topic.name
      row['tablename']= element.tablename
      const date1 = DateTime.fromISO(DateTime.now())
      const date2 = DateTime.fromISO(element.createdAt)

      const diff = date1.diff(date2, ["years", "months", "days", "hours"])

      const dateObject = diff.toObject()

      row['dataage']= dateObject.years + ' Tahun ' + dateObject.months + " Bln "+ dateObject.days + " Hari "
      row['counter']= element.datacounters.length

      //cari umur dara


      datas.push(row)
    });

    return response.status(200).json({
      code:200,
      message:"Sukses",
      data:datas,
      meta: meta
    })
  }

  public async organization({params,response }:HttpContextContract){
    const {organization_uuid, itemsPerPage,page,search} = params
    const organization = await Organization.findBy("uuid", organization_uuid)

    const catalogs = await Catalog.query().preload('topic').preload("organization").where("organization_uuid", organization_uuid).paginate(page,itemsPerPage)

    const meta = await catalogs.getMeta()

    const datas:{}[]=[]

    catalogs.forEach(async element => {
      const row = {}
      row['id']= element.uuid
      row['ref_uuid'] = element.refUuid
      row['title']= element.title
      row['icon']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/"+ element.topic?.icon)
      row['opd'] = element.organization.name
      row['topik']= element.topic?.name
      row['tablename']= element.tablename
      const date1 = DateTime.fromISO(DateTime.now())
      const date2 = DateTime.fromISO(element.createdAt)

      const diff = date1.diff(date2, ["years", "months", "days", "hours"])

      const dateObject = diff.toObject()

      row['dataage']= dateObject.years + ' Tahun ' + dateObject.months + " Bln "+ dateObject.days + " Hari "
      datas.push(row)
    });

    return response.status(200).json({
      code:200,
      message:"Sukses",
      organization: organization?.name,
      data:datas,
      meta: meta
    })
  }

  public async visualisasi({params, response}){
    const { itemsPerPage,page,search} = params

    const catalogs = await Catalog.query().preload('visualization').preload('topic').preload("organization").where('tablename','visualisasi').paginate(page,itemsPerPage)

    const meta = await catalogs.getMeta()

    const datas:{}[]=[]

    catalogs.forEach(async element => {
      const row = {}
      row['id']= element.refUuid
      row['title']= element.title
      row['thumbnail']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/visualizations/"+ element.visualization?.thumbnail)
      row['opd'] = element.organization.name
      row['topik']= element.topic?.name
      row['tablename']= element.tablename
      datas.push(row)
    });

    return response.status(200).json({
      code:200,
      message:"Sukses",
      data:datas,
      meta: meta
    })
  }

  public async infografis({params, response}){
    const { itemsPerPage,page,search} = params

    const catalogs = await Catalog.query().preload('infographic').preload('topic').preload("organization").where('tablename','infografik').paginate(page,itemsPerPage)

    const meta = await catalogs.getMeta()

    const datas:{}[]=[]

    catalogs.forEach(async element => {
      const row = {}
      row['id']= element.refUuid
      row['title']= element.title
      row['thumbnail']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/infographic/"+ element.infographic?.thumbnail)
      row['opd'] = element.organization.name
      row['topik']= element.topic?.name
      row['tablename']= element.tablename
      datas.push(row)
    });

    return response.status(200).json({
      code:200,
      message:"Sukses",
      data:datas,
      meta: meta
    })
  }

  public async videografis({params, response}){
    const { itemsPerPage,page,search} = params

    const catalogs = await Catalog.query().preload('videographic').preload('topic').preload("organization").where('tablename','videografis').orderBy('created_at','desc').paginate(page,itemsPerPage)

    const meta = await catalogs.getMeta()

    const datas:{}[]=[]

    catalogs.forEach(async element => {
      const row = {}
      row['id']= element.refUuid
      row['title']= element.title
      row['video']= element.videographic.youtubeId
      row['opd'] = element.organization.name
      row['topik']= element.topic?.name
      row['tablename']= element.tablename
      datas.push(row)
    });

    return response.status(200).json({
      code:200,
      message:"Sukses",
      data:datas,
      meta: meta
    })
  }

}
