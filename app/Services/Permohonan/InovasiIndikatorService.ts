import InovasiIndikator from "App/Models/InovasiIndikator"

export type InovasiIndikatorType={

}

class InovasiIndikatorService {
  public async lists(inovasi_uuid:string){
    const model = await InovasiIndikator.query().preload('indikator').preload('inovasiinformasi').preload('inovasidocuments').where("inovasi_uuid", inovasi_uuid).orderBy("id",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async store(payload:InovasiIndikatorType, inovasi_uuid){

  }
}

export default new InovasiIndikatorService
