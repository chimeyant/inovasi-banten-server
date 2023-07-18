import Village from "App/Models/Village"

class VillageService {
  public async lists(district_code){
    const model = await Village.query().where("district_code", district_code).orderBy("name",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

}

export default new VillageService
