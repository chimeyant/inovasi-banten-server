import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import Bentuk from "App/Models/Bentuk"

export type BentukType={
  name:string,
  status:boolean
}

class BentukService {
  public async lists(){
    const model = await Bentuk.query().orderBy("id",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async store(payload:BentukType){
    try {
      const model  = new Bentuk
      model.name = payload.name
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
        code: 500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async show(id:string){
    const model = await Bentuk.findBy("uuid",id)

    return model?.datarecord
  }

  public async update(payload:BentukType, id:string){
    try {
      const model = await Bentuk.findBy("uuid",id)
      model?.merge({
        name:payload.name,
        status:payload.status
      })
      await model?.save()

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
      const model = await Bentuk.findBy("uuid",id)
      await model?.delete()

      return {
        code:200,
        success:true,
        message:MSG_DELETE_SUCCESS,
        data:{id:id}
      }
    } catch (error) {
      return{
        code:200,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async combo(){
    const model = await Bentuk.query().where("status",true).orderBy("id",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.combo)
    });

    return datas;
  }
}

export default new BentukService
