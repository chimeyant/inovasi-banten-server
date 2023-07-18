import { MSG_FAILED_PROCESS, MSG_STORE_SUCCESS } from "App/Helpers/Lang";
import Slider from "App/Models/Slider";

export type SliderType = {
  title:string,
  subtitle: string,
  content: string,
  path:string,
  status:boolean
}

class SliderService {
  public async list(){
    const model = await Slider.query().orderBy("created_at",'desc')

    const datas:{}[]=[]

    model.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['title']= element.title
      row['status']= element.status ? {color:'green', text: "Aktif"}: {color:"red", text:"Tidak Aktif"}
      datas.push(row)
    });

    return datas
  }

  public async store(payload:SliderType){
    try {
      const model = new Slider
      model.title = payload.title
      model.subtitle = payload.subtitle
      model.content = payload.content
      model.path = payload.path
      model.status = payload.status
      await model.save()

      return {
        code:200,
        success:true,
        message:MSG_STORE_SUCCESS,
        data: model.datadisplay
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

export default new SliderService
