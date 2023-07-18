import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Proclist from "App/Models/Proclist";

export type ProclistType ={
  code:string,
  name:string,
}

class ProclistService {
  public async list(request){
    const {page, itemsPerPage}= request.only(['page','itemsPerPage'])
    const model = await Proclist.query().withScopes((scopes)=> scopes.filterOn(request)).paginate(page,itemsPerPage)

    const datas:{}[]=[]

    model.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['code']= element.code
      row['name']= element.name
      datas.push(row)
    });

    return {
      data:  datas,
      meta: model.getMeta()
    };
  }

  public async store(payload:ProclistType){
    try {
      const model = new Proclist
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
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async show(id:string){
    const model = await Proclist.findBy("uuid",id)

    return model?.datarecord
  }

  public async update(payload:ProclistType, id:string){
    try {
      const model = await Proclist.findBy("uuid", id)
      model?.merge({code:payload.code, name:payload.name})
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
      const model = await Proclist.findBy("uuid",id)
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
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }
}

export default new ProclistService
