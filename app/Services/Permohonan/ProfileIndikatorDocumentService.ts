import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import ProfileIndikatorDocument from "App/Models/ProfileIndikatorDocument"
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export type ProfileIndikatorDocumentType={
  profile_uuid:string,
  indikator_pemda_uuid:string,
  profile_indikator_uuid:string,
  nomor_dokumen:string,
  tanggal_dokumen:Date,
  tentang:string,
  type_file:string,
  file_dokumen:string
}

class ProfileIndikatorDocumentService {
  public async lists(profile_indikator_uuid:string){
    const model = await ProfileIndikatorDocument.query().where("profile_indikator_uuid", profile_indikator_uuid).orderBy("id",'asc')

    const datas:{}[]=[]

    model.forEach(async element => {
      const row= element.datadisplay
      row['path_document']= Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ element.fileDokumen)
      datas.push(row)
    });

    return datas;
  }

  public async store(payload:ProfileIndikatorDocumentType){
    try {
      const model = new ProfileIndikatorDocument
      model.profileUuid = payload.profile_uuid
      model.indikatorPemdaUuid= payload.indikator_pemda_uuid
      model.profileIndikatorUuid = payload.profile_indikator_uuid
      model.nomorDokumen = payload.nomor_dokumen
      model.tanggalDokumen = payload.tanggal_dokumen
      model.tentang = payload.tentang
      model.typeFile = payload.type_file
      model.fileDokumen = payload.file_dokumen
      await model.save()

      return{
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

  public async show(id:string){
    const model = await ProfileIndikatorDocument.findBy("uuid",id)

    return model?.datarecord
  }

  public async update(payload:ProfileIndikatorDocumentType, id:string){
    try {
      const model = await ProfileIndikatorDocument.findBy("uuid", id)
      model?.merge({
        nomorDokumen: payload.nomor_dokumen,
        tanggalDokumen: payload.tanggal_dokumen,
        tentang: payload.tentang,
        typeFile: payload.type_file,
        fileDokumen: payload.file_dokumen
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

  public async deleted(id:string){
    try {
      const model = await ProfileIndikatorDocument.findBy("uuid",id)
      await model?.delete()

      return {
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

export default new ProfileIndikatorDocumentService
