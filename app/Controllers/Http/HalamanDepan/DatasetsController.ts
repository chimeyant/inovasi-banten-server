import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dataset from 'App/Models/Dataset'
import DatasetDetail from 'App/Models/DatasetDetail'
import DatasetHeader from 'App/Models/DatasetHeader'
import axios from 'axios'
import DataCounter from 'App/Helpers/DataCounter'
import { DateTime } from 'luxon'
import Env from "@ioc:Adonis/Core/Env"
import *  as XLSX from "xlsx"
import Application from "@ioc:Adonis/Core/Application"

export default class DatasetsController {
  public async index({params}: HttpContextContract) {
  }
  public async create({}: HttpContextContract) {}
  public async store({}: HttpContextContract) {}

  public async show({params,request, response}: HttpContextContract) {
    const {dataset_uuid} = params

    const dataset = await Dataset.query().preload("organization").preload('datasetmeta').preload("datacounters"). preload('topic').where("uuid", dataset_uuid).first()

    //laod dataset detail
    const data={}
    data['id']= dataset?.uuid
    data['title']= dataset?.title
    data['description']= dataset?.description
    data['opd']= dataset?.organization.name
    data['topik']= dataset?.topic.name
    data['counter']= dataset?.datacounters.length
    const date1 = DateTime.fromISO(DateTime.now())
    const date2 = DateTime.fromISO(dataset?.createdAt)
    const diff = date1.diff(date2, ["years", "months", "days", "hours"])
    const dateObject = diff.toObject()

    data['dataage']= dateObject.years + ' Tahun ' + dateObject.months + " Bln "+ dateObject.days + " Hari "
    data['map_type']= dataset?.mapType
    data['map_url']= dataset?.mapUrl
    data['meta']= dataset?.datasetmeta
    data['download_json']= Env.get("BASE_URL")+"/dataset-download-json/"+ dataset?.uuid
    data['download_csv']= Env.get("BASE_URL")+"/dataset-download-csv/"+ dataset?.uuid


    //data dari datas set
    const dataheaders = await DatasetHeader.query().where('dataset_uuid', dataset_uuid).where("visible",true).whereNot('value','id').orderBy("id", 'asc')
    data['headers'] = dataheaders

    //add to statistik
    await DataCounter.store(dataset_uuid, dataset?.groupDataUuid, dataset?.topicUuid,request.ip() )

    return response.status(200).json({
      success:true,
      code:200,
      message:'sukses',
      data:data
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async showdata({params, response}){
    const {dataset_uuid}= params

    try {
      const dataset = await Dataset.query().where("uuid", dataset_uuid).first()

      if(dataset?.method=='api'){

      let {data:{access_token}}= await axios.post("https://apimanager.dev.bantenprov.go.id/api/oauth/token",{grant_type: 'password', client_id:1, client_secret:'Nvhu5tnjFKWWCDzNQR6jxrnfQKaB3Q22PbO4RoWP'})

        let config ={
          timeout:10000,
          headers:{
            'Authorization':'Bearer ' + access_token
          }
        }

        let {data:{data}} = await  axios.get(dataset.apiPath + dataset.apiParam, config)

        return response.status(200).json({
          success:true,
          code:200,
          message:'sukses',
          data: data
        })


      }else{
        const datasetdetails = await DatasetDetail.query().where('dataset_uuid',dataset_uuid).orderBy('id','asc')

        const datas:{}[]=[]
        datasetdetails.forEach(element => {
          datas.push(element.body)
        });

        return response.status(200).json({
          success:true,
          code:200,
          message:'sukses',
          data: datas
        })
      }

    } catch (error) {

    }
  }

  public async downloadXlS({params}:HttpContextContract){

  }

  public async downloadCSV({params, response}:HttpContextContract){
    const {dataset_uuid}= params

    try {
      const dataset = await Dataset.query().where("uuid", dataset_uuid).first()

      if(dataset?.method=='api'){

      let {data:{access_token}}= await axios.post("https://apimanager.dev.bantenprov.go.id/api/oauth/token",{grant_type: 'password', client_id:1, client_secret:'Nvhu5tnjFKWWCDzNQR6jxrnfQKaB3Q22PbO4RoWP'})

        let config ={
          timeout:10000,
          headers:{
            'Authorization':'Bearer ' + access_token
          }
        }

        let {data:{data}} = await  axios.get(dataset.apiPath + dataset.apiParam, config)

        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");



        const pathFile = Env.get("NODE_ENV")== 'production'? Application.tmpPath('../../tmp')+ "/"+ dataset_uuid+".xlsx" :Application.tmpPath()+ "/"+ dataset_uuid+".xlsx"

        XLSX.writeFile(workBook, pathFile )

        return response.download(pathFile)

      }else{
        const datasetdetails = await DatasetDetail.query().where('dataset_uuid',dataset_uuid).orderBy('id','asc')

        const datas:{}[]=[]
        datasetdetails.forEach(element => {
          datas.push(element.body)
        });

        return response.status(200).json({
          success:true,
          code:200,
          message:'sukses',
          data: datas
        })
      }
    }catch{

      }

  }

  public async downloadJSON({params, response}:HttpContextContract){
    const {dataset_uuid}= params

    try {
      const dataset = await Dataset.query().where("uuid", dataset_uuid).first()

      if(dataset?.method=='api'){

      let {data:{access_token}}= await axios.post("https://apimanager.dev.bantenprov.go.id/api/oauth/token",{grant_type: 'password', client_id:1, client_secret:'Nvhu5tnjFKWWCDzNQR6jxrnfQKaB3Q22PbO4RoWP'})

        let config ={
          timeout:10000,
          headers:{
            'Authorization':'Bearer ' + access_token
          }
        }

        let {data:{data}} = await  axios.get(dataset.apiPath + dataset.apiParam, config)

        return response.status(200).json({
          success:true,
          code:200,
          message:'sukses',
          data: data
        })


      }else{
        const datasetdetails = await DatasetDetail.query().where('dataset_uuid',dataset_uuid).orderBy('id','asc')

        const datas:{}[]=[]
        datasetdetails.forEach(element => {
          datas.push(element.body)
        });

        return response.status(200).json({
          success:true,
          code:200,
          message:'sukses',
          data: datas
        })
      }
  }

}
