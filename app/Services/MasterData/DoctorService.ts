import { MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import { MSG_DELETE_SUCCESS } from "App/Helpers/Utility";
import Doctor from "App/Models/Doctor";

export type DoctorType = {
  code:string,
  name:string
}

class DoctorService {

  public async lists(){
    const model = await Doctor.query().orderBy("name","asc")

    const datas:{}[]=[]

    model.forEach(element => {
      const row={}
      row['id']= element.uuid
      row['code']= element.code
      row['name']= element.name

      datas.push(row)
    });

    return datas;
  }

  public async store(payload:DoctorType){
    try {
      const model = new Doctor
      model.code = payload.code
      model.name = payload.name

      await model.save()

      return {
        code:200,
        success:true,
        message:MSG_STORE_SUCCESS,
        data:model.datadisplay
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
    const model = await Doctor.findBy("uuid", id)

    return model?.datarecord
  }

  public async update(payload:DoctorType, id:string){
    try {
      const model = await Doctor.findBy("uuid",id)
      model?.merge({
        code:payload.code,
        name:payload.name,
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
        code :500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async delete(id:string){
    try {
      const model = await Doctor.findBy("uuid",id)
      await model?.delete()

      return{
        code :200,
        success:true,
        message: MSG_DELETE_SUCCESS,
        data:{id:id}
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS
      }
    }
  }

  public async combo(){
    const model = await Doctor.query().orderBy("name",'asc')

    const datas:{}[]= []

    model.forEach(element => {
      const row ={}
      row['value']= element.uuid
      row['text']=  element.name
      datas.push(row)
    });

    return datas;
  }

}
export default new DoctorService
