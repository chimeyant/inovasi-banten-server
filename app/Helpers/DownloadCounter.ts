import DownloadCounterModel from "App/Models/DownloadCounter"

class DownloadCounter {
  public async store(ref_uuid:string, group_data_uuid:string, topic_uuid:string, ipadd:string){

    try {
      const model = new DownloadCounterModel
      model.refUuid = ref_uuid
      model.groupDataUuid = group_data_uuid
      model.topicUuid = topic_uuid
      model.ipadd = ipadd
      await model.save()

      return true
    } catch (error) {
      return false
    }
  }
}

export default new DownloadCounter
