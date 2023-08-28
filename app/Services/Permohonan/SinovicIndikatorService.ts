import { MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import SinovicIndikator from "App/Models/SinovicIndikator"
import CategoryService from "../MasterData/CategoryService"
import InidkatorService from "../MasterData/InidkatorService"
import Sinovic from "App/Models/Sinovic"

export type SinovicIndikatorType={
  sinovic_uuid:string,
  indikator_uuid:string,
  inidkator_name:string,
  score: number
}

class SinovicIndikatorService {
  protected Model = SinovicIndikator

  public async lists(sinovic_uuid:string){
    const model = await this.Model.query().where('sinovic_uuid', sinovic_uuid).orderBy("id",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }



  public async store(sinovic_uuid: string){
    try {
      //find categpry uuid
      const category = await CategoryService.showByCode('KIPP')

      const indikators = await InidkatorService.lists(category.id)

      const datas:{}[]=[]

      indikators.forEach(element => {
          const row ={}
          row['sinovic_uuid']= sinovic_uuid
          row['indikator_uuid']= element.id
          row['indikator_name']= element.name + " (" + element.skor +")"
          row['score']= 0
          datas.push(row)
      });

      await this.Model.createMany(datas)

      return true
    } catch (error) {
      return false
    }
  }

  public async show(id:string){
    const model = await this.Model.findBy("uuid",id)

    return model?.datarecord
  }

  public async update(payload:SinovicIndikatorType, id:string, sinovic_uuid: string){
    try {
      const model = await this.Model.findBy("uuid", id )
      model?.merge({
        score:payload.score
      })
      await model?.save()

      //update sinovic score
      //find all score



      const jmlscore = await this.Model.query().knexQuery.sum('score').whereRaw('sinovic_uuid = ?',[sinovic_uuid] )

      await Sinovic.query().where("uuid", payload.sinovic_uuid).update({finnaly_score: jmlscore[0].sum})

      return {
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
        data: model?.datadisplay
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error
      }
    }
  }
}

export default new SinovicIndikatorService
