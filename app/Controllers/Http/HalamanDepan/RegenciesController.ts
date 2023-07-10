import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Regency from 'App/Models/Regency'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"


export default class RegenciesController {
  public async index({response}: HttpContextContract) {
    const iregencies = await Regency.query().where('integration',true).orderBy("integration",'asc')

    const idatas:{}[]= []

    iregencies.forEach(async element => {
      const row = {}
      row['id']= element.uuid
      row['name']= element.name
      row['logo'] = Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/"+ element.logo)
      row['integration']= element.integration
      row['url']= element.url;
      idatas.push(row)
    });

    const bregencies = await Regency.query().where('integration',false).whereNot("code","36").orderBy("integration",'asc')

    const bdatas:{}[]= []

    bregencies.forEach(async element => {
      const row = {}
      row['id']= element.uuid
      row['name']= element.name
      row['logo'] = Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/"+ element.logo)
      row['integration']= element.integration
      row['url']= element.url;
      bdatas.push(row)
    });

    return response.status(200).json({
      code:200,
      success:true,
      message:"Succes",
      idata:idatas,
      bdata:bdatas
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
