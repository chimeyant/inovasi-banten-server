import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Diaglist from "App/Models/Diaglist"

export type DialistType ={
  code:string,
  name:string,
  status:boolean,
}

export type ListTyp ={

}



class DiaglistService {
  public async lists(request){
    const {page, itemsPerPage}= request.only(['page','itemsPerPage'])
    const model = await Diaglist.query().withScopes((scopes)=> scopes.filterOn(request)).paginate(page,itemsPerPage)

    const datas:{}[]=[]

    model.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['code']= element.code
      row['name']= element.name
      row['status']= element.status ? {color:'green',text:"Aktif"}:{color:'red',text:'Tidak Aktif'}
      datas.push(row)
    });

    return {
      data:  datas,
      meta: model.getMeta()
    };
  }

  public async store(payload:DialistType){

    try {
     const model = new Diaglist
     model.code = payload.code
     model.name = payload.name

     await model.save()

     return{
      code:200,
      success:true,
      message:MSG_STORE_SUCCESS,
      data:model.datadisplay
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
    const model = await Diaglist.findBy("uuid", id)

    return model?.datarecord
  }

  public async update(payload:DialistType, id:string){
    try {
      const model = await Diaglist.findBy("uuid",id)
      model?.merge({
        code:payload.code,
        name:payload.name,
        status: payload.status
      })

      await model?.save()

      return {
        code:200,
        success:true,
        message: MSG_UPDATE_SUCCESS,
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
      const model = await Diaglist.findBy("uuid",id)
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

export default new DiaglistService
