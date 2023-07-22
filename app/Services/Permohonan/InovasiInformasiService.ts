import { MSG_FAILED_PROCESS, MSG_STORE_SUCCESS } from "App/Helpers/Lang";
import InovasiIndikator from "App/Models/InovasiIndikator";
import InovasiInformasi from "App/Models/InovasiInformasi";


class InovasiInformasiService {
  public async show(inovasi_indikator_uuid:string){
    const model = await InovasiInformasi.findBy("inovasi_indikator_uuid",inovasi_indikator_uuid)
    return model?.datarecord
  }

  public async store(inovasi_indikator_uuid:string, informasi:string){
    try {
      const model = await InovasiInformasi.findBy("inovasi_indikator_uuid",inovasi_indikator_uuid)
      if(model){
        model.merge({
          informasi: informasi
        })
        model.save()
      }else{
        //find form inovasi indikator
        const inovasiindikator = await InovasiIndikator.findBy("uuid", inovasi_indikator_uuid)

        const payload ={
          inovasiUuid: inovasiindikator?.inovasiUuid,
          indikatorUuid: inovasiindikator?.indikatorUuid,
          inovasiIndikatorUuid: inovasi_indikator_uuid,
          informasi: informasi,
        }
        await InovasiInformasi.create(payload)
      }

      return {
        code:200,
        success:true,
        message: MSG_STORE_SUCCESS,
        data: ""
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

export default new InovasiInformasiService
