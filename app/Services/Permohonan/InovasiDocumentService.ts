import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import InovasiDocument from "App/Models/InovasiDocument"
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export type InovasiDocumentType={
  inovasi_uuid:string,
  indikator_uuid:string,
  inovasi_indikator_uuid:string,
  nomor_dokumen:string,
  tanggal_dokumen:Date,
  tentang:string,
  type_file:string,
  file_dokumen:string
}
class InovasiDocumentService {
  public async lists(inovasi_indikator_uuid:string){
    const model = await InovasiDocument.query().where("inovasi_indikator_uuid",inovasi_indikator_uuid).orderBy("id",'asc')

    const datas:{}[]=[]

    model.forEach(async element => {
      const row =element.datadisplay
      row['path_document']= Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ element.fileDokumen)
      datas.push(row)
    });

    return datas;
  }

  public async store(payload: InovasiDocumentType){
    try {
      const model = new InovasiDocument
      model.inovasiUuid = payload.inovasi_uuid
      model.indikatorUuid = payload.indikator_uuid
      model.inovasiIndikatorUuid = payload.inovasi_indikator_uuid,
      model.nomorDokumen =payload.nomor_dokumen
      model.tanggalDokumen = payload.tanggal_dokumen,
      model.tentang = payload.tentang,
      model.typeFile = payload.type_file,
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
    const model = await InovasiDocument.findBy("uuid",id)

    return model?.datarecord
  }

  public async update(payload:InovasiDocumentType, id:string){
    try {
      const model = await InovasiDocument.findBy("uuid",id)
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

  public async delete(id:string){
    try {
      const model = await InovasiDocument.findBy("uuid",id)
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

export default new InovasiDocumentService
