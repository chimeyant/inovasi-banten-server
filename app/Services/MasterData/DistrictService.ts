import District from "App/Models/District";


class DistrictService {
  public async lists(regency_code:string){
    const model = await District.query().where('regency_code',regency_code ).orderBy('name','asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async combo(regency_code:string){
    const model = await District.query().where('regency_code',regency_code ).orderBy('name','asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.combo)
    });

    return datas;
  }
}

export default new DistrictService
