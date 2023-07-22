import { MSG_FAILED_PROCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import ProfileIndikator from "App/Models/ProfileIndikator";

class ProfileIndikatorService {
  public async lists(profile_uuid:string){
    const model = await ProfileIndikator.query().preload('indikatorpemda').preload("profiledocuments").where("profile_uuid",profile_uuid).orderBy("id",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async update(informasi:string, id:string){
     try {
      const model = await ProfileIndikator.findBy("uuid", id)
      model?.merge({
        informasi:informasi
      })
      await model?.save()

      await model?.preload("indikatorpemda")
      await model?.preload("profiledocuments")


      return {
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
}

export default new  ProfileIndikatorService
