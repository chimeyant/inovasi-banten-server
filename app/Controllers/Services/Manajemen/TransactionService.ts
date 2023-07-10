import Transaction from "App/Models/Transaction";
import Env from "@ioc:Adonis/Core/Env"
import Application from "@ioc:Adonis/Core/Application"
import XLSX from "xlsx"
import { MSG_CATEGORY_UPDATE_SUCCESS, MSG_FAILED_PROCESS, MSG_IMPORT_SUCCESS, MSG_STATUS_UPDATE_SUCCESS } from "App/Helpers/Lang";
import { DateTime } from "luxon";
import Doctor from "App/Models/Doctor";
import BpjsKela from "App/Models/BpjsKela";



class TransactionService {

  public async list(request){
    const {page, itemsPerPage}= request.only(['page','itemsPerPage'])
    const model = await Transaction.query().preload("doctor").withScopes((scopes)=> scopes.filterOn(request)).paginate(page,itemsPerPage)

    const datas:{}[]=[]

    model.forEach(async element => {
      const row ={}

      row['id']= element.uuid
      row['nama_pasien']= {text: element.namaPasien, status:element.status}
      row['category_uuid']=element.categoryUuid
      row['discharge_date']= DateTime.fromJSDate( element.dischargeDate).toFormat("dd/MM/yyyy")
      row['description']= element.description
      row['total_tarif']= element.totalTarif
      row['tarif_rs']= element.tarifRs
      row['doctor']= element.doctor ? element.doctor.name : "NA"
      row['kategori']= {category_uuid: element.categoryUuid , id: element.uuid}
      row['pengobatan']= element.rawatJalan ? {color:'green', text:"Rawat Jalan"}:{color:'red', text:"Rawat Inap"}
      row['status']= {status: element.status, id:element.uuid}
      datas.push(row)
    });

    return {
      data:  datas,
      meta: model.getMeta()
    };
  }

  public async store(){}

  public async show(id:string){
    const model = await Transaction.findBy("uuid",id)

    return model?.datarecord
  }

  public async update(){}

  public async delete(){}

  public async import(filename:string, sheetName:string, jenisPengobatan:boolean ){
    try {
      let pathFile

      if(Env.get("NODE_ENV")=="development"){
        pathFile = Application.publicPath("../storage/documents/"+ filename)
      }else{
        pathFile = Application.publicPath("../../storage/documents/"+ filename)
      }


      const data = XLSX.readFile(pathFile)

      const worksheet = data.Sheets[sheetName];

      const jsonBody =  XLSX.utils.sheet_to_json(worksheet,{raw:false})

      const datas:{}[]=[]

       jsonBody.forEach(async element => {

        let dpjp =  element.DPJP

        let doctor = await Doctor.query().knexQuery.whereLike("name" ,"%"+ dpjp +"%").first()
        console.log(doctor)
        let kelas = await BpjsKela.findBy("code",element.KELAS_RAWAT)
        let tempdiagnosis = element.DIAGLIST;
        let diaglists = tempdiagnosis.split(";")
        let tempproclist = element.PROCLIST  == undefined ?null: element.PROCLIST
        tempproclist = tempproclist ? tempproclist.replace("-",""):null
        let proclists = tempproclist ? tempproclist.split(";"):null





        const row ={}
        row['bpjs_kelas_uuid']=kelas?.uuid
        row['bpjs_kelas']= element.KELAS_RAWAT
        row['discharge_date']= new Date(element.DISCHARGE_DATE)
        row['diaglist']= JSON.stringify(diaglists)
        row['proclist']= JSON.stringify(proclists)

        row['total_tarif']= isNaN(element.TOTAL_TARIF)? 0 : Number(element.TOTAL_TARIF)
        row['tarif_rs']= isNaN(element.TARIF_RS)? 0: Number(element.TARIF_RS)
        row['nama_pasien']= element.NAMA_PASIEN
        row['umur'] =Number(element.UMUR_TAHUN)
        row['dpjp']= element.DPJP
        row['doctor_uuid']= doctor? doctor.uuid :null
        row['sep']= element.SEP
        row['description']= element.KETPENDING
        row['rawat_jalan']= jenisPengobatan

        //save data
        await Transaction.create(row)
      })


      return {
        code:200,
        success:true,
        message:MSG_IMPORT_SUCCESS,
        datas:datas
      }

    } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async updatecategory(category_uuid:string, id:string ){
    try {
      const model = await Transaction.findBy("uuid",id)
      model?.merge({categoryUuid: category_uuid})
      await model?.save()

      return {
        code:200,
        success:true,
        message: MSG_CATEGORY_UPDATE_SUCCESS,
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async updatestatus(status:boolean, id:string){
    try {
      const model = await Transaction.findBy("uuid", id)
      model?.merge({status:status})
      await model?.save()

      return{
        code:200,
        success:true,
        message:MSG_STATUS_UPDATE_SUCCESS,
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async verified(){}

}

export default new TransactionService
