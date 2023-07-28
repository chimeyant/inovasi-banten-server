import FileManagement from "App/Models/FileManagement"

export type FileManagementType ={
  name:string,
  ext:string,
  size:number,
  type:string,
  mime:string,
  used:boolean,
  ip:string,
  user_uuid:string,
}

class FileManagementService {
  public async list(){
    const model = await FileManagement.query().orderBy('created_at','desc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;

  }

  public async store(payload:FileManagementType){
    try {
      const model = new FileManagement
      model.name = payload.name
      model.ext = payload.ext
      model.size = payload.size
      model.type = payload.type
      model.mime = payload.mime
      model.used = payload.used
      model.ip = payload.ip
      model.userUuid = payload.user_uuid
      await model.save()

      return true
    } catch (error) {
      return false
    }
  }
}

export default new FileManagementService
