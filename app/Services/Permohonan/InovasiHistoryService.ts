import { MSG_FAILED_PROCESS, MSG_STORE_SUCCESS } from "App/Helpers/Lang"
import InovasiHistory from "App/Models/InovasiHistory"

export type InovasiHistoryType={
  inovasi_uuid:string,
  user_uuid:string,
  title:string,
  content:string,
  status:string
}
class InovasiHistoryService {
  public async lists(inovasi_uuid:string){
    const model = await InovasiHistory.query().preload('user').where('inovasi_uuid',inovasi_uuid).orderBy("created_at",'desc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas
  }

  public async store(payload:InovasiHistoryType){
    try {
      const model = new InovasiHistory
      model.inovasiUuid = payload.inovasi_uuid
      model.userUuid = payload.user_uuid
      model.title  = payload.title
      model.content = payload.content
      model.status = payload.status

      await model.save()

      return true
    } catch (error) {
      return false
    }
  }
}

export default new InovasiHistoryService
