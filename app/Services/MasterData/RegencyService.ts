import Regency from "App/Models/Regency";

class RegencyService {
  public async lists(province_code:string){
    const model = await Regency.query().where('province_code', province_code)

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async store(){

  }

  public async show(){}

  public async delete(){}

  public async combo(){
    const model = await Regency.query().where('province_code','36').orderBy('name','asc')

    const datas:{}[]= []

    model.forEach(element => {
      datas.push(element.combo)
    });

    return datas;
  }
}

export default new RegencyService

