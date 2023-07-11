import FileManagement from "App/Models/FileManagement"

export type FileManagementType ={
  name:string,
  ext:string,
  size:number,
  type:string,
  mime:string,
  used:boolean
}

class FileManagementService {
  public async list(){

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
      await model.save()

      return true
    } catch (error) {
      return false
    }
  }
}

export default new FileManagementService
