import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bt from 'App/Models/Bt'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class SebaransController {
  public async index({}: HttpContextContract) {
    const bts = await Bt.query().preload('perusahaan').orderBy('id','asc')

    const datas:{}[]=[]

    bts.forEach(async element => {
      const row ={}
      row['id']= element.id
      row['position']= {lat: element.lat, lng: element.lng}
      row['tooltip']= "<h4><center><img src='"+ Env.get("BASE_URL")+ await Drive.getSignedUrl("images/bts/"+ element.photo ) +"' width='120px' height='100px' /></center> <br> <hr>" + "Informasi BTS" + "</h4><div>"+ element.perusahaan.name +"</div><div>"+element.address+"</div",
      row['icon']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/"+ element.perusahaan.icon)
      row['draggable']= false
      row['visible']= true
      row['size']= [32,32]
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
