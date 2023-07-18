import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Opd from "App/Models/Opd"

export type OpdType={
  code:string,
  name:string,
}
class OpdService {
  public async lists(){
    const model = await Opd.query().orderBy('name','asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async store(payload:OpdType){
    try {
      const model = new Opd
      model.code = payload.code
      model.name = payload.name
      await model.save()

      return {
        code:200,
        success:true,
        message:MSG_STORE_SUCCESS,
        data: model.datadisplay
      }
    } catch (error) {
      return {
        code:200,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async show(id:string){
    const model = await Opd.findBy("uuid",id)

    return model?.datarecord
  }

  public async update(payload:OpdType, id:string){
    try {
      const model = await Opd.findBy("uuid",id)
      model?.merge({
        code:payload.code,
        name:payload.name,
      })
      await model?.save()

      return{
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
      const model = await Opd.findBy("uuid",id)
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

  public async combo(){
    try {
      const model = await Opd.query().orderBy("name",'asc')

      const datas:{}[]=[]

      model.forEach(element => {
        datas.push(element.combo)
      });

      return datas;
    } catch (error) {

    }
  }
}

export default new OpdService
