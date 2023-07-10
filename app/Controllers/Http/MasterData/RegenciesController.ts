import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Regency from 'App/Models/Regency'
import RegencyValidator from 'App/Validators/MasterData/RegencyValidator';
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class RegenciesController {
  public async index({}: HttpContextContract) {
    const regencies = await Regency.query().orderBy("name",'asc')

    const datas:{}[] =[]

    regencies.forEach(async element => {
      const row = {}
      row['id']= element.uuid
      row['code']= element.code
      row['name']= element.name
      row['logo']= Env.get("BASE_URL")+ await Drive.getSignedUrl('images/apps/'+ element.logo)
      row['url']= element.url
      row['status']= element.integration ? {color:'green', text:"Sudah Terintegrasi"}: {color:'red',text: 'Belum Terintegrasi' }
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params}: HttpContextContract) {
    const {id}= params

    const regency = await Regency.findBy("uuid",id)

    return regency?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name, logo,polygon, integration, url} = request.all()

    await request.validate(RegencyValidator)

    try {
      const regency = await Regency.findBy("uuid",id)
      regency?.merge({name:name, logo:logo, polygon:polygon, url:url, integration:integration})
      await regency?.save()

      return response.status(200).json({
        success:true,
        code:200,
        message:"Proses ubah data berhasil..!",
        data: regency?.dataview
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        message:"Opps..., terjadi kesalahan..!",
        errors:error
      })
    }

  }

  public async destroy({}: HttpContextContract) {}

  public async combo({}:HttpContextContract){
    const regencies = await Regency.query().orderBy("id",'asc')

    const datas:{}[]=[]
    regencies.forEach(element => {
      const row={}
      row['text']= element.code + " | " + element.name
      row['value'] = element.code
      datas.push(row)
    });

    return datas;
  }
}
