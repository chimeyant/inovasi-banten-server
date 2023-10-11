import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_PUBLISH_SUCCESS, MSG_SENDED, MSG_SEND_PERMOHONAN_SUCCESS, MSG_STORE_SUCCESS, MSG_UNPUBLISH_SUCCESS, MSG_UNSEND_PERMOHONAN_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Sinovic from "App/Models/Sinovic";
import { DateTime } from "luxon";
import {string} from "@ioc:Adonis/Core/Helpers"
import Whatsapp from "App/Helpers/Whatsapp";
import InovasiHistoryService from "./InovasiHistoryService";
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"
import UserService from "../Utility/UserService";

export type SinovicType ={
  tingkat:string,
  opd_uuid:string,
  name:string,
  jenis_uuid:string,
  kompetisi_uuid:string,
  urusan_uuid:string,
  kelompok:string,
  inisiator: string,
  bentuk_uuid:string,
  waktu_uji:string,
  waktu_penerapan:string,
  tahapan:string,
  youtube:string,
  surat_pernyataan_implementasi:string,
  surat_pernyataan_identitas:string,
  surat_pernyataan_ketersediaan_replikasi:string,
  ringkasan:string,
  ringkasan_att:string,
  latar_belakang:string,
  latar_belakang_att:string,
  kebaruan:string,
  kebaruan_att:string,
  implementasi:string,
  implementasi_att:string,
  signifikansi:string,
  signifikansi_att:string,
  adaptabilitas:string,
  adaptabilitas_att:string,
  sumber_daya:string,
  sumber_daya_att:string,
  strategi_keberlanjutan:string,
  strategi_keberlanjutan_att:string,
  inovator_nama:string,
  inovator_telp:string,
  inovator_instansi:string,
  inovator_province_code:string,
  inovator_regency_code:string,
  foto:string,
  province_code:string,
  regency_code:string,
  district_code:string,
  village_code:string,
  address:string,
  lat:string,
  lng:string,
  temp_score:number,
  finnaly_score:number,
  user_uuid:string,
  status: string,
}
class SinovicService {
  protected Model = Sinovic

  public async lists(user:any){

    if(user.authent == 'superadmin'){
      const model = await this.Model.query().preload('kompetisi').preload('regency').preload('opd').whereIn('status',['1','3','4','5','6']).orderBy("created_at",'desc')

      const datas:{}[]=[]

      model.forEach(element => {
        const row = {}
        row['id']= element.uuid
        row['name']= element.name
        row['inovator']= element.inovatorNama
        row['kabupaten']= element.regency ? element.regency.name :"-"
        row['jenis']="Sinovic"
        row['status']= element.status == '0' ? {color:'grey', text:'DRAFT'}:element.status=='1'? {color:'orange', text:'Pengajuan'}: element.status=='2'? {color:'red', text:'Ditolak'}: element.status=='3'? {color:'orange', text:'Pengajuan Ulang'}: element.status=='4'? {color:'green', text:'Terverifikasi'} :element.status=='5'? {color:'blue', text:'Publish'} :{color:'red', text:'NA'}
        datas.push(row)
      });

      return datas;
    }

    if(user.authent == 'administrator'){
      const model = await this.Model.query().preload('kompetisi').preload('regency').preload('opd').whereIn('status',['1','3','4','5','6']).orderBy("created_at",'desc')

      const datas:{}[]=[]

      model.forEach(element => {
        const row = {}
        row['id']= element.uuid
        row['name']= element.name
        row['inovator']= element.inovatorNama
        row['kabupaten']= element.regency ? element.regency.name :"-"
        row['jenis']="Sinovic"
        row['status']= element.status == '0' ? {color:'grey', text:'DRAFT'}:element.status=='1'? {color:'orange', text:'Pengajuan'}: element.status=='2'? {color:'red', text:'Ditolak'}: element.status=='3'? {color:'orange', text:'Pengajuan Ulang'}: element.status=='4'? {color:'green', text:'Terverifikasi'} :element.status=='5'? {color:'blue', text:'Publish'} :{color:'red', text:'NA'}
        datas.push(row)
      });

      return datas;
    }

    if(user.authent == 'team-pengkaji'){
      const model = await this.Model.query().preload('kompetisi').preload('opd').whereIn('status',['4','5','6']).orderBy("created_at",'desc')

      const datas:{}[]=[]

      model.forEach(element => {
        const row = {}
        Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name },{opd:element.opd.name})
        datas.push(row)
      });

      return datas;
    }

    if(user.authent == 'provinsi'){
      const model = await this.Model.query().preload('kompetisi').preload('opd').whereIn('status',['1','3','4','5','6']).orderBy("created_at",'desc')

      const datas:{}[]=[]

      model.forEach(element => {
        const row = {}
        Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name },{opd:element.opd.name})
        datas.push(row)
      });

      return datas;
    }

    if(user.authent == 'provinsi-opd'){
      const model = await this.Model.query().preload('kompetisi').preload('opd').where('opd_uuid', user.opdUuid).orderBy("created_at",'desc')

      const datas:{}[]=[]

      model.forEach(element => {
        const row = {}
        Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi ? element.kompetisi.name :"NA" })
        datas.push(row)
      });

      return datas;
    }


    if(user.authent == 'kabkota'){
      const model = await this.Model.query().preload('kompetisi').preload('opd').where('regency_code', user.regencyCode).whereIn('status',['1','3','4','5','6']).orderBy("created_at",'desc')

      const datas:{}[]=[]

      model.forEach(element => {
        const row = {}
        Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name },{opd:element.opd.name})
        datas.push(row)
      });

      return datas;
    }

    //list form opd kab/kota
    if(user.authent=='kabkota-opd'){
      const model = await this.Model.query().preload('kompetisi').where('opd_uuid', user.opdUuid).orderBy("created_at",'desc')

      const datas:{}[]=[]

      model.forEach(element => {
        const row = {}
        Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name })
        datas.push(row)
      });

      return datas;
    }

  }

  public async store(payload:SinovicType){
    try {
      const model = new this.Model
      model.tingkat = payload.tingkat
      model.opdUuid = payload.opd_uuid
      model.name = payload.name
      model.jenisUuid = payload.jenis_uuid
      model.kompetisiUuid = payload.kompetisi_uuid
      model.urusanUuid = payload.urusan_uuid
      model.kelompok = payload.kelompok
      model.inisiator = payload.inisiator
      model.bentukUuid = payload.bentuk_uuid
      model.waktuUji = payload.waktu_uji
      model.waktuPenerapan = payload.waktu_penerapan
      model.tahapan = payload.tahapan
      model.youtube = payload.youtube
      model.suratPernyataanImplementasi = payload.surat_pernyataan_implementasi
      model.suratPernyataanIdentitas = payload.surat_pernyataan_identitas
      model.suratPernyataanKetersediaanReplikasi = payload.surat_pernyataan_ketersediaan_replikasi
      model.ringkasan = payload.ringkasan
      model.ringkasanAtt = payload.ringkasan_att
      model.latarBelakang = payload.latar_belakang
      model.latarBelakangAtt = payload.latar_belakang_att
      model.kebaruan = payload.kebaruan
      model.kebaruanAtt = payload.kebaruan_att
      model.implementasi= payload.implementasi
      model.implementasiAtt = payload.implementasi_att
      model.signifikansi = payload.signifikansi
      model.signifikansiAtt = payload.signifikansi_att
      model.adaptabilitas = payload.adaptabilitas
      model.adaptabilitasAtt = payload.adaptabilitas_att
      model.sumberDaya = payload.sumber_daya
      model.sumberDayaAtt = payload.sumber_daya_att
      model.strategiKeberlanjutan = payload.strategi_keberlanjutan
      model.strategiKeberlanjutanAtt = payload.strategi_keberlanjutan_att
      model.inovatorNama = payload.inovator_nama
      model.inovatorTelp = payload.inovator_telp
      model.inovatorInstansi = payload.inovator_instansi
      model.inovatorProvinceCode = payload.inovator_province_code
      model.inovatorRegencyCode = payload.inovator_regency_code
      model.foto = payload.foto
      model.provinceCode = payload.province_code
      model.regencyCode = payload.regency_code
      model.districtCode = payload.district_code
      model.villageCode = payload.village_code
      model.address = payload.address
      model.lat = payload.lat
      model.lng = payload.lng
      model.tempScore = payload.temp_score
      model.finnalyScore = payload.finnaly_score
      model.userUuid = payload.user_uuid
      model.status = payload.status

      await model.save()

      return {
        code:200,
        success:true,
        message:MSG_STORE_SUCCESS,
        data: model.datadisplay
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

  public async show(id:string){
    const model = await this.Model.findBy("uuid",id)

    const data ={}
    const property ={
      path_surat_pernyataan_implementasi : Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.suratPernyataanImplementasi),
      path_surat_pernyataan_identitas : Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.suratPernyataanIdentitas),
      path_surat_pernyataan_ketersediaan_replikasi : Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.suratPernyataanKetersediaanReplikasi),
      path_ringkasan_att:Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.ringkasanAtt),
      path_latar_belakang_att:Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.latarBelakangAtt),
      path_kebaruan_att:Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.kebaruanAtt),
      path_implementasi_att:Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.implementasiAtt),
      path_signifikansi_att:Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.signifikansiAtt),
      path_adaptabilitas_att:Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.adaptabilitasAtt),
      path_sumber_daya_att:Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.sumberDayaAtt),
      path_strategi_keberlanjutan_att:Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.strategiKeberlanjutanAtt),
      path_foto:Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ model?.foto),
    }

    Object.assign(data, model?.datarecord, property)

    return data;
  }

  public async update(payload:SinovicType, id:string){
    try {
      const model = await this.Model.findBy("uuid",id)

      model?.merge({
        tingkat:payload.tingkat,
        opdUuid: payload.opd_uuid,
        name: payload.name,
        jenisUuid: payload.jenis_uuid,
        kompetisiUuid: payload.kompetisi_uuid,
        urusanUuid: payload.urusan_uuid,
        kelompok: payload.kelompok,
        inisiator: payload.inisiator,
        bentukUuid: payload.bentuk_uuid,
        waktuUji: payload.waktu_uji,
        waktuPenerapan: payload.waktu_penerapan,
        tahapan: payload.tahapan,
        youtube: payload.youtube,
        suratPernyataanImplementasi: payload.surat_pernyataan_implementasi,
        suratPernyataanIdentitas: payload.surat_pernyataan_identitas,
        suratPernyataanKetersediaanReplikasi: payload.surat_pernyataan_ketersediaan_replikasi,
        ringkasan: payload.ringkasan,
        ringkasanAtt: payload.ringkasan_att,
        latarBelakang:payload.latar_belakang,
        latarBelakangAtt: payload.latar_belakang_att,
        kebaruan:payload.kebaruan,
        kebaruanAtt: payload.kebaruan_att,
        signifikansi: payload.signifikansi,
        signifikansiAtt: payload.signifikansi_att,
        adaptabilitas: payload.adaptabilitas,
        adaptabilitasAtt: payload.adaptabilitas_att,
        sumberDaya:payload.sumber_daya,
        sumberDayaAtt: payload.sumber_daya_att,
        strategiKeberlanjutan: payload.strategi_keberlanjutan,
        strategiKeberlanjutanAtt: payload.strategi_keberlanjutan_att,
        inovatorNama:payload.inovator_nama,
        inovatorTelp: payload.inovator_telp,
        inovatorInstansi: payload.inovator_instansi,
        inovatorProvinceCode: payload.inovator_province_code,
        inovatorRegencyCode: payload.inovator_regency_code,
        foto:payload.foto,
        provinceCode:payload.province_code,
        regencyCode: payload.regency_code,
        districtCode: payload.district_code,
        villageCode:payload.village_code,
        address: payload.address,
        lat: payload.lat,
        lng:payload.lng,
        tempScore: payload.temp_score,
        finnalyScore: payload.finnaly_score,
        userUuid: payload.user_uuid,
        status: payload.status
      })

      await model?.save()

      return{
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
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

  public async delete(id:string){
    try {
      const model = await this.Model.findBy("uuid",id)
      await model?.delete()

      return{
        code:200,
        success:true,
        message:MSG_DELETE_SUCCESS,
        data:{id:id}
      }
    } catch (error) {
      return{
        code:200,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async send(id:string, user:any){
    try {
      const currdate = new Date()
      const register = "REG."+ DateTime.fromJSDate(currdate).toFormat("yyyyMM")+"."+ string.generateRandom(4)

      const model = await this.Model.findBy('uuid',id)
       model?.merge({
        noreg:register,
        status:'1'
      })
      await model?.save()

      await InovasiHistoryService.store({
        inovasi_uuid:model?.uuid,
        user_uuid:user.id,
        title:"Mengirim Permohonan",
        content:"",
        status:"1"
      })

      const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ user?.name.toUpperCase() + "\r\n\r\nTerima Kasih, permohonan Inovasi Anda Dengann Nomor Registrasi "+ register +" Akan Segera Kami Proses..! \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

      await Whatsapp.sendMessage(user.phone, pesan)

      return{
        code:200,
        success:true,
        message:MSG_SEND_PERMOHONAN_SUCCESS
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

  public async unsend(id:string, user:any){
    try {
      const model = await this.Model.findBy('uuid',id)
       model?.merge({
        noreg:null,
        status:'0'
      })
      await model?.save()

      await InovasiHistoryService.store({
        inovasi_uuid:model?.uuid,
        user_uuid:user.id,
        title:"Pembatalan Permohonan",
        content:"",
        status:"0"
      })

      return{
        code:200,
        success:true,
        message:MSG_UNSEND_PERMOHONAN_SUCCESS
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

  public async verifdoc(id:string, status:any, pesan:any, verfiuser:any){
    try {
      const model = await this.Model.findBy('uuid', id)
      console.log(verfiuser)

      model?.merge({
        status:status,
      })

      await model?.save()

      //add log
      await InovasiHistoryService.store({
        inovasi_uuid:model?.uuid,
        user_uuid:verfiuser.id,
        title:"Proses Verifikasi",
        content:pesan,
        status:status
      })

      const user = await UserService.getPhomeByOPD(model?.opdUuid)


       //kirim pesan wa
       if(status=='2'){
        const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ user?.name.toUpperCase() + "\r\n\r\nMohon maaf permohonan anda dengan nomor registrasi : "+ model?.noreg +" ditolak, silahkan perbaiki terlebih dahulu \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

        await Whatsapp.sendMessage(user?.phone, pesan)
      }
      if(status=='4'){
        const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ user?.name.toUpperCase() + "\r\n\r\nSelamat permohonan anda dengan nomor registrasi : "+ model?.noreg +" telah berhasil terverifikasi pada tahapan verifikasi dokumen dan akan memasuki proses tahapan verifikasi substansi \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

        await Whatsapp.sendMessage(user?.phone, pesan)
      }

      if(status=='5'){
        const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ user?.name.toUpperCase() + "\r\n\r\nSelamat permohonan anda dengan nomor registrasi : "+ model?.noreg +" telah berhasil terverifikasi pada tahapan verifikasi Substansi dan akan memasuki proses tahapan publikasi \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

        await Whatsapp.sendMessage(user?.phone, pesan)

      }

      if(status=='6'){
        const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ user?.name.toUpperCase() + "\r\n\r\nSelamat permohonan anda dengan nomor registrasi : "+ model?.noreg +" telah terpublikasi \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

        await Whatsapp.sendMessage(user?.phone, pesan)
      }

      return {
        code:200,
        success:true,
        message:"Proses verifikasi berhasil..!"
      }

    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS
      }
    }
  }

  public async publish(id:string){
    try {
      const model = await this.Model.findBy("uuid",id)
      model?.merge({
        status: '5'
      })
      await model?.save()

      return{
        code:200,
        success:true,
        message:MSG_PUBLISH_SUCCESS,
      }
    } catch (error) {
      return {
        code: 500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async unpublish(id:string){
    try {
      const model = await this.Model.findBy("uuid",id)
      model?.merge({
        status: '4',
      })
      await model?.save()

      return{
        code:200,
        success:true,
        message:MSG_UNPUBLISH_SUCCESS
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

  public async publicLists(){
    const model = await this.Model.query().preload('kompetisi').preload('opd').whereIn('status',['5','6']).orderBy("created_at",'desc')

    const datas:{}[]=[]

    model.forEach(element => {
      const row = {}
      Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name },{opd:element.opd.name})
      datas.push(row)
    });

    return datas;
  }

  public async toplists(){
    const model = await this.Model.query().preload('kompetisi').preload('opd').whereIn('status',['5','6']).orderBy("created_at",'desc').limit(10)

    const datas:{}[]=[]

    model.forEach(async element => {
      const row = {}
      const  foto = element.foto ? Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ element?.foto) : "/images/logo.png"
      Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name },{opd:element.opd.name},{foto:foto})
      datas.push(row)
    });

    return datas;
  }

}

export default new SinovicService
