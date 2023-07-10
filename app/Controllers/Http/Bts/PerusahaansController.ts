import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perusahaan from 'App/Models/Perusahaan'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class PerusahaansController {
  public async index({}: HttpContextContract) {
    const perusahaans = await Perusahaan.query().orderBy("id",'asc')

    const datas:{}[]= []

    perusahaans.forEach(async element => {
      const row = {}
      row['id']= element.uuid
      row['name']= element.name
      row['icon']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/"+ element.icon)
      datas.push(row)

    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, color, icon} = request.all()

    try {
      const perusahaan = new Perusahaan
      perusahaan.name = name
      perusahaan.color = color
      perusahaan.icon = icon
      await perusahaan.save()

      return response.status(200).json({
        code:200,
        success:true,
        message:"Proses simpan data perusahaan berhasil..!",
        data: perusahaan
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        message:"Opps..., terjadi kesalahan",
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const perusahaan = await Perusahaan.findBy("uuid",id)

    const data ={}
    data['id']= perusahaan?.uuid
    data['name']= perusahaan?.name
    data['icon']= perusahaan?.icon

    return data
  }

  public async edit({}: HttpContextContract) {}

  public async update({params,request, response}: HttpContextContract) {
    const {id}= params
    const {name, color, icon} = request.all()

    try {
      const perusahaan = await Perusahaan.findBy("uuid",id)
      perusahaan?.merge({name:name, color:color, icon:icon})
      await perusahaan?.save()

      return response.status(200).json({
        code:200,
        success:true,
        message:"Proses simpan data perusahaan berhasil..!",
        data: perusahaan?.record
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        message:"Opps..., terjadi kesalahan",
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const perusahaan = await Perusahaan.findBy("uuid",id)
      await perusahaan?.delete()

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
        errors:error
      })
    }
  }

  public async combo({}:HttpContextContract){
    const perusahaans = await Perusahaan.query().orderBy("name", 'asc')

    const datas:{}[]=[]

    perusahaans.forEach(element => {
      const row ={}
      row['value']= element.uuid
      row['text']= element.name
      datas.push(row)
    });

    return datas;
  }
}
