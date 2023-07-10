import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Organization from 'App/Models/Organization'
import OrganizationValidator from 'App/Validators/MasterData/OrganizationValidator';
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"


export default class OrganizationsController {
  public async index({}: HttpContextContract) {
    const organizations = await Organization.query().orderBy('hierarchy','asc')
    const datas:{}[]=[]

    organizations.forEach(async element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['description']= element.description
      row['logo']= Env.get("BASE_URL") + + await Drive.getSignedUrl("images/apps/"+ element.icon)
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params}: HttpContextContract) {
    const {id}= params

    const organization = await Organization.findBy("uuid",id)

    return organization?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name, description, icon, integration}= request.all()

    await request.validate(OrganizationValidator)
    try {
      const organization = await Organization.findBy("uuid",id)
      organization?.merge({name:name, description:description, icon:icon, integration:integration})
      await organization?.save()

      return response.status(200).json({
        success:true,
        code:200,
        message:"Proses ubah data berhasil..!",
        data:organization?.dataview
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        message:"Opps..., terjadi kesalahan...!",
        errors:error
      })
    }
  }

  public async destroy({}: HttpContextContract) {}

  public async combo({}:HttpContextContract){
    const organizations = await Organization.query().orderBy("id","asc")

    const datas :{}[]=[]

    organizations.forEach(element => {
      const row ={}
      row['text']=   element.name
      row['value']= element.uuid
      datas.push(row)
    });

    return datas;
  }
}
