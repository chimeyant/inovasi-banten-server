import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Problem from "App/Models/Problem";

export type ProblemType ={
  category_uuid:string,
  code:string,
  name:string
}
class ProblemService {

  public async list(){
    const model = await Problem.query().preload('category').orderBy("id",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['category']= element.category.name
      row['code']= element.code
      row['name']= element.name
      datas.push(row)
    });

    return datas
  }

  public async store(payload:ProblemType){
    try {
      const model = new Problem
      model.categoryUuid = payload.category_uuid
      model.code = payload.code
      model.name = payload.name
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
    const model = await Problem.findBy("uuid", id)

    return model?.datarecord
  }

  public async update(payload: ProblemType, id:string){
    try {
      const model = await Problem.findBy("uuid",id)
      model?.merge({
        categoryUuid:payload.category_uuid,
        code: payload.code,
        name:payload.name
      })
      await model?.save()

      await model?.preload("category")

      return {
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
        data:model?.datadisplay
      }
    } catch (error) {
      return {
        code :500,
        success:false,
        message: MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async delete(id:string){
    try {
      const model = await Problem.findBy("uuid",id)
      model?.delete

      return {
        code:200,
        success:true,
        message:MSG_DELETE_SUCCESS,
        data:{id:id}
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
}

export default new ProblemService
