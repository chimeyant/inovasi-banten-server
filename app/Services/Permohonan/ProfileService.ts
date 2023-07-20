import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Profile from "App/Models/Profile";

export type ProfilType={
  user_uuid:string,
  province_code:string,
  regency_code:string,
  opd_uuid:string,
  opd_name:string,
  email:string,
  phone:string,
  jabatan_admin:string,
  file_fakta_integritas:string,
  logo:string,
  status:string
}

class ProfileService {
  public async lists(){
    const model = await Profile.query().orderBy("id",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });
  }

  public async store(payload:ProfilType){
    try {
      const model = new Profile
      model.userUuid = payload.user_uuid
      model.provinceCode = payload.province_code
      model.regencyCode = payload.regency_code
      model.opdUuid = payload.opd_uuid
      model.opdName = payload.opd_name
      model.email = payload.email
      model.phone = payload.phone
      model.jabatanAdmin= payload.jabatan_admin
      model.fileFaktaIntegritas= payload.file_fakta_integritas
      model.logo = payload.logo
      model.status = payload.status

      await model.save()

      return {
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

  public async show(opd_uuid:string){
    const model = await Profile.findBy("opd_uuid",opd_uuid)

    if(model){
      return model?.datarecord
    }else{
      return null
    }

  }

  public async showbyopd(opd_uuid:string){
    const model = await Profile.findBy("opd_uuid",opd_uuid)

    return model?.datarecord
  }

  public async showbyuserid(user_uuid:string){
    const model = await Profile.findBy("userUuid", user_uuid)

    return model?.datarecord
  }

  public async update(payload:ProfilType, id:string){
    try {
      const model = await Profile.findBy("uuid",id)
      model?.merge({
        userUuid: payload.user_uuid,
        provinceCode: payload.province_code,
        regencyCode: payload.regency_code,
        opdUuid: payload.opd_uuid,
        opdName: payload.opd_name,
        email: payload.email,
        phone: payload.email,
        jabatanAdmin: payload.jabatan_admin,
        fileFaktaIntegritas: payload.file_fakta_integritas,
        logo: payload.logo,
        status: payload.status
      })

      await model?.save()

      return{
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
        data:model?.datadisplay
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

  public async delete(id:string){
    try {
      const model = await Profile.findBy("uuid",id)
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

export default new ProfileService
