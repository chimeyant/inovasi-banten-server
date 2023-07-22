import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import IndikatorPemda from "App/Models/IndikatorPemda";
import Profile from "App/Models/Profile";
import ProfileIndikator from "App/Models/ProfileIndikator";
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export type ProfilType={
  name:string,
  user_uuid:string,
  province_code:string,
  regency_code:string,
  opd_uuid:string,
  opd_name:string,
  email:string,
  phone:string,
  nama_admin:string,
  jabatan_admin:string,
  file_fakta_integritas:string,
  logo:string,
  alamat:string,
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

      //import data indikator
      const indikators = await IndikatorPemda.query().orderBy("id",'asc')

      const dataindikators:{}[]=[]

      indikators.forEach(element => {
        const row={}
        row['profileUuid']= model.uuid
        row['indikatorPemdaUuid']= element.uuid
        dataindikators.push(row)
      });

      await ProfileIndikator.createMany(dataindikators)

      return {
        code:200,
        success:true,
        message:MSG_STORE_SUCCESS,
        data: model.datadisplay,
        indikator:dataindikators
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

  public async show(regency_code:string){
    const model = await Profile.query().preload("opd").where("regency_code",regency_code).first()

    if(model){
      let data = {}
      data = model.datarecord
      data['path_logo']= Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+  model.logo)
      return data
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
      const model = await Profile.query().where("uuid",id).first()
      model?.merge({
        name:payload.name,
         opdName: payload.opd_name,
         email: payload.email,
         phone: payload.phone,
         namaAdmin:payload.nama_admin,
         jabatanAdmin: payload.jabatan_admin,
         fileFaktaIntegritas: payload.file_fakta_integritas,
         logo: payload.logo,
         alamat:payload.alamat,
      })

      await model?.save()

      await model?.preload("opd")



      return{
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
        data:model?.datarecord
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

  public async showByRegency(regency_code:string){
    const model = await Profile.query().preload('opd').preload('profileindikator',(trxQuery)=>{
      trxQuery.preload("indikatorpemda").preload("profiledocuments")
    }).preload('province').preload('regency').where("regency_code",regency_code).first()

    let data = model?.verifikatordatarecord

    data['path_file_fakta_integritas']= Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.fileFaktaIntegritas)

    return data;
  }

  /**
   * Area Verifikator
   */


}

export default new ProfileService
