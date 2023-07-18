import Province from "App/Models/Province";

export type ProvinceType ={
  code:number,
  name:string
}

class ProvinceService {
 public async list(){
  const model = await Province.query().orderBy("code", 'asc' )

  const datas:{}[]=[]

  model.forEach(element => {
    datas.push(element.datadisplay)
  });


  return datas
 }

 public async show(id:string){
   const model = await Province.findBy("uuid", id)

   return model?.datarecord
 }
}

export default new ProvinceService
