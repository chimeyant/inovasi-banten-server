import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_SEND_PERMOHONAN_SUCCESS } from "App/Helpers/Lang";
import Whatsapp from "App/Helpers/Whatsapp";
import Indikator from "App/Models/Indikator";
import Inovasi from "App/Models/Inovasi"
import InovasiIndikator from "App/Models/InovasiIndikator";
import { DateTime } from "luxon";
import {string} from "@ioc:Adonis/Core/Helpers"
import InovasiHistoryService from "./InovasiHistoryService";
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export type InovasiType={
  name:string,
  jenis_inovasi_uuid:string,
  urusan_uuid:string,
  bentuk_uuid:string,
  inisiator:string,
  waktu_uji:Date,
  waktu_penerapan:Date,
  tahapan:string,
  rancang_bangun:string,
  tujuan:string,
  manfaat:string,
  hasil:string,
  file_anggaran:string,
  file_profil_bisnis:string,
  skor:number,
  tahun:number,
  inovator_nama:string,
  inovator_phone:string,
  inovator_instansi:string,
  foto:string,
  video:string,
  youtube:string,
  province_code:string,
  regency_code:string,
  district_code:string,
  village_code:string,
  alamat:string,
  alamat_dalam_peta:string,
  lat:string,
  lng:string,
}

export type UserType ={
  id:string,
  name:string,
  email:string,
  authent:string,
  opdUuid:string
}

class InovasiService {
  public async lists(opd_uuid:string){
    const model = await Inovasi.query().preload('opd').where("opd_uuid", opd_uuid).orderBy("id",'asc')

    const datas:{}[]= []

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async listall(){
    const model = await Inovasi.query().preload('opd').whereIn('status',["1","3","4","5"]).orderBy("id",'desc')

    const datas:{}[]= []

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }



  public async kabkotaList(regency_code:string){
    const model = await Inovasi.query().preload('opd').where('regency_code',regency_code).whereIn('status',["1","3","4","5"]).orderBy("id",'desc')

    const datas:{}[]= []

    model.forEach(element => {
      datas.push(element.datadisplayverifikator)
    });

    return datas;
  }





  public async store(payload:InovasiType, user:UserType){
    try {
      const model = new Inovasi
      model.name = payload.name
      model.opdUuid = user.opdUuid
      model.jenisInovasiUuid = payload.jenis_inovasi_uuid
      model.urusanUuid= payload.urusan_uuid
      model.bentukUuid = payload.bentuk_uuid
      model.inisiator = payload.inisiator
      model.waktuUji = payload.waktu_uji
      model.waktuPenerapan = payload.waktu_penerapan
      model.tahapan = payload.tahapan
      model.rancangBangun =payload.rancang_bangun
      model.tujuan = payload.tujuan
      model.manfaat = payload.manfaat
      model.hasil = payload.hasil
      model.fileAnggaran =payload.file_anggaran
      model.fileProfilBisnis = payload.file_profil_bisnis
      model.skor = payload.skor
      model.tahun = payload.tahun
      model.inovatorNama = payload.inovator_nama
      model.inovatorPhone = payload.inovator_phone
      model.inovatorInstansi = payload.inovator_instansi
      model.foto = payload.foto
      model.video = payload.video
      model.youtube =payload.youtube
      model.provinceCode = payload.province_code
      model.regencyCode = payload.regency_code
      model.districtCode = payload.district_code
      model.villageCode = payload.village_code
      model.alamat = payload.alamat
      model.alamatDalamPeta = payload.alamat_dalam_peta
      model.lat = payload.lat
      model.lng = payload.lng
      model.createdUserUuid = user.id
      model.status ="0" //0: Status Draft
      await model.save()

      await model.preload("opd")

      //create inovasi indikator
      const indikators = await Indikator.query().orderBy("id",'asc')


      const datainidikators:{}[]=[]
      indikators.forEach( element => {
        const row ={}
        row['inovasiUuid']= model.uuid
        row['indikatorUuid']= element.uuid
        datainidikators.push(row)
      });

      await InovasiIndikator.createMany(datainidikators)


      await InovasiHistoryService.store({
        inovasi_uuid: model.uuid,
        user_uuid: user?.id,
        title: "Pembuatan Draft Permohonan",
        content:"",
        status: "0"
      })

      return {
        code:200,
        success: true,
        message:"Proses tambah permohonan berhasil disimpan sebagai draft..!",
        data: model.datadisplay,
      }
   } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error,

     }
   }
  }

  public async show(id:string){
    const model = await Inovasi.findBy("uuid",id)
    return model?.datarecord
  }

  public async update(payload:InovasiType, user:UserType){
    try {

    } catch (error) {

    }
  }

  public async deleted(id:string,user:UserType){
    try {
      const model = await Inovasi.findBy("uuid",id)
      model?.merge({
        deletedUserUuid: user.id
      })
      await model?.save()

      await model?.delete()

      return {
        code:200,
        success:true,
        message:MSG_DELETE_SUCCESS,
        data:{id:id}
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async push(id:string,user){
    try {
      const model = await Inovasi.findBy("uuid",id)
      const currdate = new Date()
      const register = "REG."+ DateTime.fromJSDate(currdate).toFormat("yyyyMM")+"."+ string.generateRandom(4)
      model?.merge({
        nomorRegister: register,
        status:"1",
      })
      await model?.save()

      await model?.preload("opd")

      await InovasiHistoryService.store({
        inovasi_uuid:model?.uuid,
        user_uuid:user.id,
        title:"Mengirim Permohonan",
        content:"",
        status:"1"
      })

      //send whatsapp
      //kirim pesan wa
      const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ user?.name.toUpperCase() + "\r\n\r\nTerima Kasih, permohonan Inovasi Anda Dengann Nomor Registrasi "+ register +" Akan Segera Kami Proses..! \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

      await Whatsapp.sendMessage(user.phone, pesan)




      return{
        code:200,
        success:true,
        message:MSG_SEND_PERMOHONAN_SUCCESS,
        data:model?.datadisplay,
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async pull(id:string,user){
    try {
      const model = await Inovasi.findBy("uuid",id)
      model?.merge({
        status:'0',
        nomorRegister:"",
      })
      await model?.save()

      await model?.preload("opd")

      await InovasiHistoryService.store({
        inovasi_uuid:model?.uuid,
        user_uuid:user.id,
        title:"Pembatalan Permohonan",
        content:"",
        status:"1"
      })

      return{
        code:200,
        success:true,
        message:"Proses pembatalan permohonan berhasil...!",
        data:model?.datadisplay
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }


  /**
   * Area Verfikator
   *
   */
  public async verifikatorList(){
    const model = await Inovasi.query().preload('opd').whereIn('status',["1","3","4","5"]).orderBy("id",'desc')

    const datas:{}[]= []

    model.forEach(element => {
      datas.push(element.datadisplayverifikator)
    });

    return datas;
  }

  public async setstatus(status:string,content:string, id:string,user){
    try {
      const model = await Inovasi.findBy("uuid",id)
      model?.merge({
        status: status
      })

      await model?.save()

      await model?.preload("opd")

      await InovasiHistoryService.store({
        inovasi_uuid: model?.uuid,
        user_uuid: user.id,
        title:"Proses Verifikasi",
        content: content,
        status: status
      })

      return {
        code:200,
        success:true,
        message:"Proses verifikasi berhasil..!",
        data: model?.datadisplay
      }

    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async verifikatorshow(id:string){
    const model = await Inovasi.query().preload('opd').preload('jenisinovasi').preload('urusan').preload("bentuk").preload('regency').preload('district').preload('village').preload('inovasiindikators',(trxQuery)=> {
      trxQuery.preload('indikator').preload('inovasidocuments').preload("inovasiinformasi")
    }).where("uuid",id).first()

    let data = model?.dataverifikatorrecord
    data['path_file_anggaran'] = Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.fileAnggaran)
    data['path_file_profil_bisnis'] = Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.fileProfilBisnis)
    data['path_foto_inovasi'] = Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.foto)

    return data
  }


  /**
   * Area Publisher
   */
  public async publisherList(){
    const model = await Inovasi.query().preload('opd').whereIn('status',["4","5","6"]).orderBy("id",'desc')

    const datas:{}[]= []

    model.forEach(element => {
      datas.push(element.datadisplayverifikator)
    });

    return datas;
  }







}

export default new InovasiService
