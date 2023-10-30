import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Kompetisi from "App/Models/Kompetisi";

export type KompetisiType ={
  category_uuid:string,
  name:string,
  description:string,
  start_date:string,
  end_date:string,
  status:boolean
}
class KompetisiService {
  protected Model = Kompetisi

  public async lists(){
    const model = await this.Model.query().preload('category').where('status', true).orderBy('start_date','desc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }


  public async store(payload:KompetisiType){
    try {
      const model = new this.Model
      model.categoryUuid = payload.category_uuid,
      model.name = payload.name
      model.description  = payload.description
      model.startDate = payload.start_date
      model.endDate  = payload.end_date
      model.status = payload.status
      await model.save()

      const data = await this.Model.find(model.id)
      await data?.preload('category')

      return{
        code:200,
        success:true,
        message:MSG_STORE_SUCCESS,
        data: data?.datadisplay
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async show(id:string){
    const model = await this.Model.findBy('uuid',id)

    return model?.datarecord
  }

  public async update(payload:KompetisiType, id:string){
    try {


      const model = await this.Model.findBy("uuid",id)

      model?.merge({
        categoryUuid:payload.category_uuid,
        name: payload.name,
        description: payload.description,
        startDate: payload.start_date,
        endDate: payload.end_date,
        status:payload.status
      })
      await model?.save()

      await model?.preload("category")

      return{
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
        data:model?.datadisplay
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async delete(id:string){
    try {
      const model = await this.Model.findBy("uuid",id)
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
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async combo(category_uuid:any){
    const model = await this.Model.query().where("category_uuid", category_uuid).where('status',true).orderBy("name",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.combo)
    });

    return datas;
  }
}

export default new KompetisiService
