import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Sponsor from "App/Models/Sponsor"
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export type SponsorType={
  name:string,
  logo:string,
  website:string,
  status:boolean,
}
class SponsorService {
  public async lists(){
    const model = await Sponsor.query().orderBy("id",'desc')

    const datas:{}[]=[]

    model.forEach(async element => {
      const row = element.datadisplay
      row['logo']= Env.get('BASE_URL')+ await Drive.getSignedUrl("images/sliders/"+ element.logo)
      datas.push(row)
    });

    return datas;
  }

  public async store(payload:SponsorType){
    try {
      const model = new Sponsor
      model.name = payload.name
      model.logo = payload.logo
      model.website = payload.website
      model.status = payload.status

      await model.save()

      return {
        code:200,
        success:true,
        message:MSG_STORE_SUCCESS,
        data: model.datadisplay
      }
    } catch (error) {
      return {
        code:500,
        success: false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async show(id:string){
    const model = await Sponsor.findBy("uuid",id)

    return model?.datarecord
  }

  public async update(payload:SponsorType, id:string){
    try {
      const model = await Sponsor.findBy("uuid",id)
      model?.merge({
        name:payload.name,
        logo: payload.logo,
        website: payload.website,
        status: payload.status
      })
      await model?.save()

      return {
        code:200,
        success: true,
        message:MSG_UPDATE_SUCCESS,
        data:model?.datadisplay
      }
    } catch (error) {
      return{
        code :500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async delete(id:string){
    try {
      const model = await Sponsor.findBy("uuid",id)
      await model?.delete()

      return{
        code:200,
        success:true,
        message:MSG_DELETE_SUCCESS,
        data:{id:id}
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        messsage:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async publiclists(){
    const model = await Sponsor.query().where("status",true).orderBy("created_at",'desc')

    const datas:{}[]=[]

    model.forEach(async element => {
      const row = element.datadisplay
      row['logo']= Env.get('BASE_URL')+ await Drive.getSignedUrl("images/sliders/"+ element.logo)
      datas.push(row)
    });

    return datas;
  }


}

export default new SponsorService
