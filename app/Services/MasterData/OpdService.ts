import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Opd from "App/Models/Opd"
import Regency from "App/Models/Regency";

export type OpdType={
  code:string,
  name:string,
}
class OpdService {
  public async lists(){
    const model = await Opd.query().orderBy("id",'asc')

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
      const model = await Opd.query().where('regency_code','36').orderBy("name",'asc')
      const datas:{}[]=[]
      model.forEach(element => {
        datas.push(element.combo)
      });

      return datas;
    } catch (error) {

    }
  }

  public async comboByRegency(regency_code:string){
    try {
      const model = await Opd.query().where('regency_code', regency_code).orderBy("name",'asc')

      const datas:{}[]= []

      model.forEach(element => {
        datas.push(element.combo)
      });

      return datas;
    } catch (error) {

    }
  }

  public async generate(regency_code:string){
    try {
      const sourcedata = await Opd.query().where("regency_code","36").orderBy("id",'asc')

      const regency = await Regency.findBy("code", regency_code)

      const datas:{}[]=[]
      sourcedata.forEach(element => {
        const row={}
        row['code']= element.code
        row['name']= element.name + " "+ regency?.name
        row['regency_code']= regency_code
        datas.push(row)
      });

      await Opd.createMany(datas)

      return {
        code:200,
        success:true,
        message:MSG_SUCCESS
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

export default new OpdService
