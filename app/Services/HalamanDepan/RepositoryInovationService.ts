import Inovation from "App/Models/Inovation"
import Sinovic from "App/Models/Sinovic"

class RevositoryInovationService {
  protected Model = Inovation

  public async lists(){
    const model = await this.Model.query().preload('kompetisi').whereIn("status",[5,6]).orderBy("id",'desc')

    const datas:{}[]=[]

    model.forEach(element => {
      const row = {}
      Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name })
      datas.push(row)
    });

    //load data sinovic


    return datas;

  }
}

export default new RevositoryInovationService
