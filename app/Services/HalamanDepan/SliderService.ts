import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Slider from "App/Models/Slider";
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export type SliderType = {
  title:string,
  subtitle: string,
  content: string,
  path:string,
  top_image:string,
  bottom_image:string,
  priority_status:boolean,
  priority_number:number,
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
      model.topImage = payload.top_image
      model.bottomImage= payload.bottom_image
      model.priorityStatus= payload.priority_status
      model.priorityNumber = payload.priority_number
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

  public async show(id:string){
    const model = await Slider.findBy("uuid",id)

    const data = model?.datarecord
    data['path_url']= Env.get("BASE_URL")+ await Drive.getSignedUrl('images/sliders/'+ model?.path)

    return data;
  }

  public async update(payload:SliderType, id:string){
    try {
      const model =await  Slider.findBy("uuid",id)
      model?.merge({
        title:payload.title,
        subtitle:payload.subtitle,
        content:payload.content,
        path:payload.path,
        status:payload.status,
        topImage:payload.top_image,
        bottomImage:payload.bottom_image,
        priorityStatus:payload.priority_status,
        priorityNumber:payload.priority_number,

      })
      await model?.save()

      return {
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
        data: model?.datadisplay
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

  public async deleted(id:string){
    try {
      const model = await Slider.findBy("uuid",id)
      await model?.delete()

      return{
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

  public async publish(){
    /**
     * Load priority slider
     */

    const model1 = await Slider.query().where('status',true).where('priority_status',true).orderBy("priority_number",'asc')
    const datas:[]=[]

    model1.forEach(async element => {
      const row = element.datapublish
      const url = await Drive.getSignedUrl("images/sliders/"+ element.path)
      row['path']= Env.get("BASE_URL")+ url
      row['top_image_status'] =element.topImage ? true:false
      row['top_image_path']= element.topImage ? Env.get("BASE_URL")+ await Drive.getSignedUrl("images/sliders/"+ element.topImage) :""
      datas.push(row)
    });

    const model2 = await Slider.query().where('status',true).where('priority_status',false).orderBy("created_at",'asc')

    model2.forEach(async element => {
      const row = element.datapublish
      const url = await Drive.getSignedUrl("images/sliders/"+ element.path)
      row['path']= Env.get("BASE_URL")+ url
      row['top_image_status'] =element.topImage ? true:false
      row['top_image_path']= element.topImage ? Env.get("BASE_URL")+ await Drive.getSignedUrl("images/sliders/"+ element.topImage):""
      datas.push(row)
    });

    return datas;
  }
}

export default new SliderService
