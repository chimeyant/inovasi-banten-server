import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bts from 'App/Models/Bt'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"
import Application from "@ioc:Adonis/Core/Application"
import *  as XLSX from "xlsx"
import RegisterUsersController from '../Auth/RegisterUsersController'

export default class SurveysController {
  public async index({}: HttpContextContract) {
    const bts = await Bts.query().preload("regency").preload("perusahaan").orderBy("id",'desc')

    const datas:{}[]=[]
    bts.forEach(async element => {
      const row ={}
      row['id']= element.uuid
      row['kabupaten']= element.regency.name
      //row['name']= element.perusahaan.name
      row['address']= element.address
      //row['icon']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/"+ element.perusahaan.icon)
      datas.push(row)

    });
    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, regency_code, district_code, village_code,perusahaan_uuid, lat,lng, address, photo }= request.all()

    try {
      const bts = new Bts
      bts.name = name
      bts.provinceCode = '36'
      bts.regencyCode = regency_code
      bts.districtCode = district_code
      bts.villageCode = village_code
      bts.perusahaanUuid = perusahaan_uuid
      bts.lat = lat
      bts.lng = lng
      bts.address=address
      bts.photo = photo

      await bts.save()

      return response.status(200).json({
        code:200,
        success:true,
        message:"Proses tambah data berhasil",
        data:bts
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        message:"Opps..., terjadi kesalahan ",
        error:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params
    const bts = await Bts.findBy("uuid",id)

    return bts;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params


    const {name, regency_uuid, district_uuid, village_uuid,perusahaan_uuid, lat,lng, address, photo }= request.all()

    try {
      const bts = await Bts.findBy("uuid",id)
      bts?.merge({name:name, regencyUuid:regency_uuid,districtUuid:district_uuid, villageUuid:village_uuid, perusahaanUuid:perusahaan_uuid, lat:lat,lng:lng,address:address,photo})

      await bts?.save()

      return response.status(200).json({
        code:200,
        success:true,
        message:"Proses ubah data berhasil",
        data:{
          id:bts?.uuid,
          name:bts?.name
        }
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        message:"Opps..., terjadi kesalahan ",
        error:error
      })
    }

  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const bts = await Bts.findBy("uuid",id)
      await bts?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        message:"Proses hapus data berhasil..!",
        data:{
          id:id
        }
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        message:"Opps..., terjadi kesalahan ",
        errors:error,
      })
    }
  }

  public async import({request, response}:HttpContextContract){
    const {filename, regency_code} = request.all()

    try {
      let pathfile = ""
      if(Env.get("NODE_ENV")=='development'){
        pathfile = Application.publicPath("../storage/images/bts/"+ filename)
      }else{
        pathfile = Application.publicPath("../../storage/images/bts/"+ filename)
      }

      //read data excel
      const data =  XLSX.readFile(pathfile)

      const first_worksheet = data.Sheets[data.SheetNames[0]];
      //const jsonheaders =  XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
      const jsonbodys = XLSX.utils.sheet_to_json(first_worksheet)
      //const headers = jsonheaders.shift()
      //const jsondatabodys = JSON.stringify(jsonbodys)

      const datas:{}[]= []

      jsonbodys.forEach(element => {
        const row ={}
        row['name']= element.Site
        row['province_code']='36'
        row['regency_code']= regency_code
        row['district_code']= element.Kode_Kecamatan
        row['lat']= element.Lat
        row['lng']= element.Long
        datas.push(row)
      });

      await Bts.createMany(datas)

      return response.status(200).json({
        code:200,
        success:true,
        message:'success',
        data: datas
      })

    } catch (error) {

    }
  }
}
