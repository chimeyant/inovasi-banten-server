import CatalogModel from "App/Models/Catalog"

class Catalog {


  constructor() {

  }

  public async store(group_data_uuid,topic_uuid,organization_uuid,tablename, ref_uuid, title, tag, status ){
    try {
      const catalog = new CatalogModel
      catalog.groupDataUuid= group_data_uuid
      catalog.topicUuid = topic_uuid
      catalog.organizationUuid= organization_uuid
      catalog.tablename = tablename
      catalog.refUuid = ref_uuid
      catalog.title = title
      catalog.tag = tag
      catalog.status = status
      await catalog.save()

      return true;
    } catch (error) {
      return false
    }
  }

  public async update(group_data_uuid,topic_uuid,organization_uuid,tablename, ref_uuid, title, tag, status ){
    try {
      const catalog = await CatalogModel.findBy("ref_uuid", ref_uuid)
      catalog?.merge({groupDataUuid:group_data_uuid, topicUuid:topic_uuid, organizationUuid:organization_uuid, tablename:tablename, title:title, tag:tag,status:status})
      await catalog?.save()

      return true;
    } catch (error) {
      return false
    }

  }

  public async updatestatus(){

  }

  public async delete(ref_uuid){
    try {
      const catalog = await CatalogModel.findBy("ref_uuid", ref_uuid)
      await catalog?.delete()

      return true
    } catch (error) {
      return false
    }
  }
}

export default Catalog;
