import { MSG_FAILED_PROCESS, MSG_STORE_SUCCESS } from "App/Helpers/Lang";
import Opd from "App/Models/Opd";

export type OpdKabkotaType={
  code:string,
  name:string,
  regency_code:string
}
class OpdKabkotaService {
  public async lists(regency_code:string){
    const model = await Opd.query().where('regency_code',regency_code).orderBy('name','asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async store(payload:OpdKabkotaType){
    try {
      const model = new Opd
      model.code = payload.code
      model.name  = payload.name
      model.regencyCode = payload.regency_code
      await model.save()

      return {
        code:200,
        success:true,
        message:MSG_STORE_SUCCESS,
        data:model.datadisplay
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

  public async combo(regency_code:string){
    try {
      const model = await Opd.query().where('regency_code',regency_code).orderBy("name",'asc')

      const datas:{}[]=[]

      model.forEach(element => {
        datas.push(element.combo)
      });

      return datas;
    } catch (error) {

    }
  }
}

export default new OpdKabkotaService
