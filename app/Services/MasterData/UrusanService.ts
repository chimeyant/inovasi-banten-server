import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Urusan from "App/Models/Urusan"

export type UrusanType={
  name:string,
  img:string,
  status: boolean,
}
class UrusanService {
  protected Model = Urusan;
  public async lists(){
    const model = await Urusan.query().orderBy("id",'asc')

    const datas:{}[]= []

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async store(payload:UrusanType){
    try {
      const model = new this.Model
      model.name = payload.name
      model.img = payload.img
      model.status = payload.status
      await model.save()

      return{
        code:200,
        success:true,
        message:MSG_STORE_SUCCESS,
        data: model.datadisplay
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

  public async update(payload:UrusanType, id:string){
    try {
      const model = await this.Model.findBy('uuid',id)
      model?.merge({
        name:payload.name,
        img:payload.img,
        status:payload.status
      })

      return{
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
      const model = await this.Model.findBy("uuid",id)
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
    const model = await Urusan.query().where('status',true).orderBy("id",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.combo)
    });

    return datas;
  }
}

export default new UrusanService
