import DataCounterModel from "App/Models/DataCounter"
class DataCounter {
  public async store(ref_uuid:string, group_data_uuid:string, topic_uuid:string, ipadd:string){
    try {
      const datacountermodel = new DataCounterModel
      datacountermodel.refUuid = ref_uuid
      datacountermodel.groupDataUuid = group_data_uuid
      datacountermodel.topicUuid = topic_uuid
      datacountermodel.ipadd = ipadd
      await datacountermodel.save()

      return true
    } catch (error) {
      return false
    }
  }
}

export default new DataCounter;
