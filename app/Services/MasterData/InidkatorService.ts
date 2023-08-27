import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import Indikator from "App/Models/Indikator"

export type IndikatorType ={
  name:string,
  skor:number,
  optional:boolean,
  status:boolean

}
class IndikatorService {
  public async lists(category_uuid:string){
    const model = await Indikator.query().preload("category").where('category_uuid',category_uuid).orderBy("id",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async store(payload:IndikatorType, category_uuid:string){
    try {
      const model = new Indikator
      model.categoryUuid =category_uuid
      model.name = payload.name
      model.skor = payload.skor
      model.optional = payload.optional
      model.status = payload.status
      await model.save()

      await model.preload("category")

      return {
        code:200,
        success:true,
        message:MSG_STORE_SUCCESS,
        data: model.datadisplay
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        data:{},
        error:error
      }
    }
  }

  public async show(id:string){
    const model = await Indikator.findBy("uuid",id)

    return model?.datarecord
  }

  public async update(payload:IndikatorType,id:string){
    try {
      const model = await Indikator.findBy("uuid",id)
      model?.merge({
        name:payload.name,
        skor:payload.skor,
        optional: payload.optional,
        status:payload.status
      })
      await model?.save()

      await model?.preload('category')

      return {
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
        data:model?.datadisplay
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async delete(id:string){
    try {
      const model= await Indikator.findBy("uuid",id)

      await model?.delete()

      return {
        code:200,
        success:true,
        message:MSG_DELETE_SUCCESS,
        data:{id:id}
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }
}

export default new IndikatorService
