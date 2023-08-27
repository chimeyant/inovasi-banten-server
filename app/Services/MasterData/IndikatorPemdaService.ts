import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import IndikatorPemda from "App/Models/IndikatorPemda"

export type IndikatorPemdaType={
  name:string,
  skor:number,
  status:boolean
}

class IndikatorPemdaService {
  public async lists(){
    const model = await IndikatorPemda.query().preload('category').orderBy("id","asc")

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async store(payload:IndikatorPemdaType){
    try {
      const model = new IndikatorPemda
      model.name = payload.name
      model.skor = payload.skor
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
        error:error
      }
    }
  }

  public async show(id:string){
    const model = await IndikatorPemda.findBy("uuid",id)

    return model?.datarecord
  }

  public async update(payload:IndikatorPemdaType, id:string){
    try {
      const model = await IndikatorPemda.findBy("uuid",id)
      model?.merge({
        name: payload.name,
        skor: payload.skor,
        status: payload.status
      })

      await model?.save()

      return {
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
        data: model?.datadisplay
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
      const model = await IndikatorPemda.findBy("uuid",id)
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

}

export default new IndikatorPemdaService
