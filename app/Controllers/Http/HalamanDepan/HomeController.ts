import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Catalog from 'App/Models/Catalog';
import GroupDatum from 'App/Models/GroupDatum';
import Organization from 'App/Models/Organization';
import { DateTime } from 'luxon';
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"


export default class HomeController {
  public async index({response}: HttpContextContract) {



    //cari group data
    try{
      const statistik = await GroupDatum.findBy("id",1)

      const jmldatastatistik = await Catalog.query().where("group_data_uuid", statistik?.uuid).getCount()

      const keuangan = await GroupDatum.findBy("id",2)

      const jmldatakeuangan = await Catalog.query().where("group_data_uuid", keuangan?.uuid).getCount()

      const geospasial = await GroupDatum.findBy('id', 3)

      const jmldatageospasial = await Catalog.query().where('group_data_uuid', geospasial.uuid).getCount()

      const jmldataset = await Catalog.query().where('tablename','dataset').getCount()

      const jmldatavisualisasi = await Catalog.query().where('tablename','visualisasi').getCount()

      const jmldatainfografik = await Catalog.query().where("tablename",'infografik').getCount()

      const jmldatavideografis = await Catalog.query().where('tablename',"videografis").getCount()

      const jmldataprodusendata = await Organization.query().getCount()



      return response.json({
        success: true,
        code:200,
        message: "Sukses",
        data:{
          jmldatastatistik:jmldatastatistik,
          jmldatakeuangan: jmldatakeuangan,
          jmldatageospasial: jmldatageospasial,
          jmldataset: jmldataset,
          jmldatavisualisasi : jmldatavisualisasi,
          jmldatainfografik: jmldatainfografik,
          jmldataprodusendata: jmldataprodusendata,
          jmldatavideografis : jmldatavideografis,
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        message:"Opps..., terjadi kesalahan",
        errors:error
      })
    }
  }

  public async highlights({response}:HttpContextContract){
    try {
      const catalogs = await Catalog.query().preload("visualization").preload('infographic').preload("topic").orderBy("created_at",'desc').limit(10)

      const datas:{}[]= []

      catalogs.forEach(async element => {
        const row = {}
        row['id']= element.uuid
        row['title']= element.title
        row['tablename']= element.tablename
        row['url']= element.tablename == 'visualisasi' ? Env.get("BASE_URL")+ await Drive.getSignedUrl('images/visualizations/' + element.visualization.thumbnail): element.tablename=='infografik' ? Env.get('BASE_URL') + await Drive.getSignedUrl("images/infographic/"+ element.infographic.thumbnail): Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/"+ element.topic.icon)
        row['created_at']= DateTime.fromISO(element.createdAt).toFormat("yyyy/MM/dd h:m:s")
        row['topic_uuid']= element.topicUuid
        row['ref_uuid']= element.refUuid
        datas.push(row)
      });

      return response.status(200).json({
        success:true,
        code:200,
        message:"sukses",
        data: datas
      })

    } catch (error) {
      return response.status(500).json({
        success:false,
        code:200,
        message:"Opps.., terjadi kesalahan..! ",
        errors:error,
        data:[]
      })

    }


  }
}
