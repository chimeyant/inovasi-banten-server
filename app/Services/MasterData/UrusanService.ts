import Urusan from "App/Models/Urusan"

export type UrusanType={
  name:string,
  img:string,
  status: boolean,
}
class UrusanService {
  public async lists(){
    const model = await Urusan.query().orderBy("id",'asc')

    const datas:{}[]= []

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }
}

export default new UrusanService
