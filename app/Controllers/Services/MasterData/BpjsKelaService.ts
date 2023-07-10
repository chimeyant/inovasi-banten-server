import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import BpjsKela from "App/Models/BpjsKela";

export type BpjsKelaType = {
  code:string,
  name:string
}

class BpjsKelaService {
  public async list(){
    const model = await BpjsKela.query().orderBy("name","asc")

    const datas:{}[]=[]

    model.forEach(element => {
      const row = {}
      row['id']= element.uuid
      row['code']= element.code
      row['name']= element.name
      datas.push(row)
    });

    return datas;
  }

  public async show(id:string){
    const model = await BpjsKela.findBy("uuid",id)

    model?.datarecord
  }

  public async store(payload:BpjsKelaType){
    try {
      const model = new BpjsKela
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
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS
      }
    }
  }

  public async update(payload:BpjsKelaType, id:string){
    try {
      const model = await BpjsKela.findBy("uuid", id)
      model?.merge({
        code: payload.code,
        name:payload.name
      })
      await model?.save()

      return{
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
        data: model?.datarecord
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
      const model = await BpjsKela.findBy("uuid",id)
      await model?.delete()

      return {
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

  public async combo(){
    const model = await BpjsKela.query().orderBy("code")
    const datas:{}[]=[]
    model.forEach(element => {
      const row ={}
      row['text']= element.name
      row['value']= element.uuid
      datas.push(row)
    });

    return datas;
  }
}

export default new BpjsKelaService
