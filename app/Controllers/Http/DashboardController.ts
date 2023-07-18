import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Catalog from 'App/Models/Catalog'

import GroupDatum from 'App/Models/GroupDatum'
import Topic from 'App/Models/Topic'
import DashboardService from '../../Services/DashboardService'

export default class DashboardController {
  async index({response}: HttpContextContract){



    //counting data statisik
    // const statisik = await GroupDatum.query().where('name',"Statistik").first()

    // const jmldatastatistik= await Catalog.query().where("group_data_uuid", statisik?.uuid).getCount()

    // const geospasial = await GroupDatum.query().where('name',"Geospasial").first()

    // const jmldatageospasial= await Catalog.query().where("group_data_uuid", geospasial?.uuid).getCount()

    // const keuangan = await GroupDatum.query().where('name',"Keuangan").first()

    // const jmldatakeuangan= await Catalog.query().where("group_data_uuid", keuangan?.uuid).getCount()

    // return response.status(200).json({
    //   code:200,
    //   success:true,
    //   message:"success",
    //   data:{
    //     jmldatastatistik:jmldatastatistik,
    //     jmldatageospasial: jmldatageospasial,
    //     jmldatakeuangan:jmldatakeuangan,
    //   }
    // })
  }

  async datachartbyjenis({response}:HttpContextContract){

    const datas =[]
    const labels = ['Dataset', 'Visualisasi', 'Infografis','Videografis','Dokumen']

    //counter dataset
    const jmldataset = await Catalog.query().where('tablename','dataset').getCount()
    datas.push(jmldataset)

    //counter visualiasi
    const jmldatavisualisasi = await Catalog.query().where('tablename','visualisasi').getCount()
    datas.push(jmldatavisualisasi)

    //counter infografis
    const jmldatainfografis = await Catalog.query().where('tablename','infografik').getCount()
    datas.push(jmldatainfografis)

    //counter videografis
    const jmldatavideografis = await Catalog.query().where('tablename','videografis').getCount()
    datas.push(jmldatavideografis)

    //counter document
    const jmldatadocument = await Catalog.query().where('tablename','document').getCount()
    datas.push(jmldatadocument)

    return response.status(200).json({
      code:200,
      success:true,
      message:"successed",
      labels:labels,
      datas:datas
    })

  }

  async datachartbytopic({response}:HttpContextContract){
    const topics = await Topic.query().preload('catalogs').orderBy("id",'asc')

    const datas=[]
    const labels=[]

    topics.forEach(element => {
      const name = element.name
      const counter = element.catalogs.length
      labels.push(element.name)
      datas.push(counter)
    });

    return response.status(200).json({
      code:200,
      success:true,
      message:"succesed",
      labels:labels,
      datas:datas
    })

  }

  async recapMonthly({}:HttpContextContract){
    const result = await DashboardService.recap_monthly()

    return result
  }

  async perJenisPengobatan({}:HttpContextContract){
    const result = await DashboardService.per_jenis_pengobatan()

    return result
  }

  async recapPerTahun({}:HttpContextContract){
    const result = await DashboardService.recap_per_tahun()

    return result;
  }

  async tarifRsPerTahun({}:HttpContextContract){
    const result = await DashboardService.total_tarif_rs_per_tahun()

    return result;
  }

}
