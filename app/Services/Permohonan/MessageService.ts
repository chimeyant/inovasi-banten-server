import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_SENDED } from "App/Helpers/Lang"
import Message from "App/Models/Message"

export type MessageType={
  parent_uuid:string,
  from_user_uuid:string,
  to_user_uuid:string,
  title:string,
  body:string,
  sended_at:string,
  receve_at:string,
}

export type Usertype={
  id:string,
  name:string,
  email:string,
  authent:string,
}
class MessageService {
  public async litst(user:Usertype){
    if(user.authent == 'superadmin'){
      const model = await Message.query().orderBy("created_at",'desc')

      const datas:{}[]= []

      model.forEach(element => {
        datas.push(element.datadisplay)
      });

      return datas;

    }else if(user.authent =='administrator'){
      const model = await Message.query().orderBy("created_at",'desc')

      const datas:{}[]= []

      model.forEach(element => {
        datas.push(element.datadisplay)
      });

      return datas;
    }else{
      const model = await Message.query().where('from_user_uuid',user.id).orderBy("created_at",'desc')

      const datas:{}[]= []

      model.forEach(element => {
        datas.push(element.datadisplay)
      });

      return datas;
    }

  }

  public async store(payload:MessageType){
     try {
      const model = new Message
      model.fromUserUuid = payload.from_user_uuid
      model.toUserUuid = payload.to_user_uuid
      model.title = payload.title
      model.body = payload.body
      model.sendedDate = new Date
      await model.save()

      return {
        code:200,
        success:true,
        message:MSG_SENDED,
        data:model.datadisplay
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

  public async show(id:string){
    const model = await Message.findBy("uuid", id)

    return model?.datarecord;
  }

  public async update(payload:MessageType, id:string){
    try {
      const model = await Message.findBy("uuid", id)
      model?.merge({
        fromUserUuid: payload.from_user_uuid,
        toUserUuid: payload.to_user_uuid,
        title: payload.title,
        body: payload.body,

      })

      await model?.save()

      return {
        code:200,
        success:true,
        message:MSG_SENDED,
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
      const model = await Message.findBy("uuid",id)
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
}

export default new MessageService()
