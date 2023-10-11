import Inovation from "App/Models/Inovation"
import Sinovic from "App/Models/Sinovic"

class RevositoryInovationService {
  protected Model = Inovation

  public async lists(){
    const kompetisi = await this.Model.query().preload('kompetisi').preload('regency').whereIn("status",[5,6]).orderBy("id",'desc')

    const datas:{}[]=[]

    let i = 1
    kompetisi.forEach(element => {
      const row = {}
      row['id']= element.uuid
      row['num']= i++
      row['name']= element.name
      row['inovator'] = element.inovatorNama
      row['kabupaten']= element.regency ? element.regency.name :""
      datas.push(row)
    });

    //load data sinovic
    const sinovic = await Sinovic.query().preload('kompetisi').preload('regency').whereIn("status",[5,6]).orderBy("id",'desc')

    sinovic.forEach(element => {
      const row = {}
      row['id']= element.uuid
      row['num']=i++
      row['name']= element.name
      row['inovator'] = element.inovatorNama
      row['kabupaten']= element.regency ? element.regency.name :""
      datas.push(row)
    });

    return datas;

  }
}

export default new RevositoryInovationService
