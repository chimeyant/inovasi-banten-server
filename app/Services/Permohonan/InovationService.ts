import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_PUBLISH_SUCCESS, MSG_SEND_PERMOHONAN_SUCCESS, MSG_STORE_SUCCESS, MSG_UNPUBLISH_SUCCESS, MSG_UNSEND_PERMOHONAN_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import Inovation from "App/Models/Inovation"
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"
import Whatsapp from "App/Helpers/Whatsapp"
import { DateTime } from "luxon"
import {string} from "@ioc:Adonis/Core/Helpers"
import InovasiHistoryService from "./InovasiHistoryService"

export type SinovicType ={
  category_uuid:string,
  tingkat:string,
  user_uuid:string,
  opd_uuid:string,
  name:string,
  jenis_uuid:string,
  kompetisi_uuid:string,
  urusan_uuid:string,
  urusans:string,
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
  status: string,
}

class InovationService {
  protected Model = Inovation

  public async lists(payload:any){

    if(payload.user.authent == 'superadmin'){
      const model = await this.Model.query().preload('kompetisi').preload('regency').whereIn('status',['1','3','4','5','6']).orderBy("created_at",'desc')

      const datas:{}[]=[]

      model.forEach(element => {
        const row = {}
        row['id']= element.uuid
        row['name']= element.name
        row['inovator']= element.inovatorNama
        row['kabupaten']= element.regency? element.regency.name:"-"
        row['jenis']="Kompetisi"
        row['status']= element.status == '0' ? {color:'grey', text:'DRAFT'}:element.status=='1'? {color:'orange', text:'Pengajuan'}: element.status=='2'? {color:'red', text:'Ditolak'}: element.status=='3'? {color:'orange', text:'Pengajuan Ulang'}: element.status=='4'? {color:'green', text:'Terverifikasi'} :element.status=='5'? {color:'blue', text:'Publish'} :{color:'red', text:'NA'}
        datas.push(row)
      });

      return datas;
    }

    if(payload.user.authent == 'administrator'){
      const model = await this.Model.query().preload('kompetisi').preload('regency').whereIn('status',['1','3','4','5','6']).orderBy("created_at",'desc')

      const datas:{}[]=[]

      model.forEach(element => {
        const row = {}
        row['id']= element.uuid
        row['name']= element.name
        row['inovator']= element.inovatorNama
        row['kabupaten']= element.regency? element.regency.name:"-"
        row['jenis']="Kompetisi"
        row['status']= element.status == '0' ? {color:'grey', text:'DRAFT'}:element.status=='1'? {color:'orange', text:'Pengajuan'}: element.status=='2'? {color:'red', text:'Ditolak'}: element.status=='3'? {color:'orange', text:'Pengajuan Ulang'}: element.status=='4'? {color:'green', text:'Terverifikasi'} :element.status=='5'? {color:'blue', text:'Publish'} :{color:'red', text:'NA'}
        datas.push(row)
      });

      return datas;
    }

    if(payload.user.authent == 'provinsi'){
      const model = await this.Model.query().preload('kompetisi').preload('regency').where('category_uuid',payload.category.id).whereIn('status',['1','3','4','5','6']).orderBy("created_at",'desc')

      const datas:{}[]=[]

      model.forEach(element => {
        const row = {}
        Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name },{kabupaten:element.regency ? element.regency.name:""})
        datas.push(row)
      });

      return datas;
    }

    if(payload.user.authent == 'team-pengkaji'){
      const model = await this.Model.query().preload('kompetisi').preload('regency').where('category_uuid',payload.category.id).whereIn('status',['1','3','4','5','6']).orderBy("created_at",'desc')

      const datas:{}[]=[]

      model.forEach(element => {
        const row = {}
        Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name },{kabupaten:element.regency ? element.regency.name:""})
        datas.push(row)
      });

      return datas;
    }

    // if(user.authent == 'provinsi-opd'){
    //   const model = await this.Model.query().preload('kompetisi').preload('opd').where('opd_uuid', user.opdUuid).orderBy("created_at",'desc')

    //   const datas:{}[]=[]

    //   model.forEach(element => {
    //     const row = {}
    //     Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi ? element.kompetisi.name :"NA" })
    //     datas.push(row)
    //   });

    //   return datas;
    // }


    // if(user.authent == 'kabkota'){
    //   const model = await this.Model.query().preload('kompetisi').preload('opd').where('regency_code', user.regencyCode).whereIn('status',['1','3','4','5','6']).orderBy("created_at",'desc')

    //   const datas:{}[]=[]

    //   model.forEach(element => {
    //     const row = {}
    //     Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name },{opd:element.opd.name})
    //     datas.push(row)
    //   });

    //   return datas;
    // }

    // //list form opd kab/kota
    // if(user.authent=='kabkota-opd'){
    //   const model = await this.Model.query().preload('kompetisi').where('opd_uuid', user.opdUuid).orderBy("created_at",'desc')

    //   const datas:{}[]=[]

    //   model.forEach(element => {
    //     const row = {}
    //     Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name })
    //     datas.push(row)
    //   });

    //   return datas;
    // }

    //list for public kompetisi
    if(payload.user.authent=='kompetisi'){
      const model = await this.Model.query().preload('kompetisi').where('category_uuid',payload.category.id).where('user_uuid', payload.user.id).orderBy("created_at",'desc')

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
      model.categoryUuid = payload.category_uuid
      model.userUuid = payload.user_uuid
      model.tingkat = payload.tingkat
      model.opdUuid = payload.opd_uuid
      model.name = payload.name
      model.jenisUuid = payload.jenis_uuid
      model.kompetisiUuid = payload.kompetisi_uuid
      model.urusanUuid = payload.urusan_uuid
      model.urusans = JSON.stringify(payload.urusans),
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
    // try {
      const model = await this.Model.findBy("uuid",id)

      model?.merge({
        categoryUuid: payload.category_uuid,
        tingkat:payload.tingkat,
        userUuid: payload.user_uuid,
        opdUuid: payload.opd_uuid,
        name: payload.name,
        jenisUuid: payload.jenis_uuid,
        kompetisiUuid: payload.kompetisi_uuid,
        urusanUuid: payload.urusan_uuid,
        urusans : JSON.stringify(payload.urusans),
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
        status: payload.status
      })

      await model?.save()

      return{
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
        data: model?.datadisplay
      }
    // } catch (error) {
    //   return{
    //     code:500,
    //     success:false,
    //     message:MSG_FAILED_PROCESS,
    //     error:error
    //   }
    // }
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

      await Whatsapp.sendMessage(model?.inovatorTelp, pesan)

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


       //kirim pesan wa
       if(status=='2'){
        const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ model?.inovatorNama.toUpperCase() + "\r\n\r\nMohon maaf permohonan anda dengan nomor registrasi : "+ model?.noreg +" ditolak, silahkan perbaiki terlebih dahulu \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

        await Whatsapp.sendMessage(model?.inovatorTelp, pesan)
      }
      if(status=='4'){
        const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ model?.inovatorNama.toUpperCase() + "\r\n\r\nSelamat permohonan anda dengan nomor registrasi : "+ model?.noreg +" telah berhasil terverifikasi pada tahapan verifikasi dokumen dan akan memasuki proses tahapan verifikasi substansi \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

        await Whatsapp.sendMessage(model?.inovatorTelp, pesan)
      }

      if(status=='5'){
        const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ model?.inovatorNama.toUpperCase() + "\r\n\r\nSelamat permohonan anda dengan nomor registrasi : "+ model?.noreg +" telah berhasil terverifikasi pada tahapan verifikasi Substansi dan akan memasuki proses tahapan publikasi \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

        await Whatsapp.sendMessage(model?.inovatorTelp, pesan)

      }

      if(status=='6'){
        const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ model?.inovatorNama.toUpperCase() + "\r\n\r\nSelamat permohonan anda dengan nomor registrasi : "+ model?.noreg +" telah terpublikasi \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

        await Whatsapp.sendMessage(model?.inovatorTelp, pesan)
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
    const model = await this.Model.query().preload('kompetisi').whereIn('status',['5','6']).orderBy("created_at",'desc')

    const datas:{}[]=[]

    model.forEach(element => {
      const row = {}
      Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name },{opd:element.opd.name})
      datas.push(row)
    });

    return datas;
  }

  public async toplists(){
    const model = await this.Model.query().preload('kompetisi').whereIn('status',['5','6']).orderBy("created_at",'desc').limit(10)

    const datas:{}[]=[]

    model.forEach(async element => {
      const row = {}
      const  foto = Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ element?.foto)
      Object.assign(row, element.datadisplay,{kompetisi: element.kompetisi.name },{opd:element.opd.name},{foto:foto})
      datas.push(row)
    });

    return datas;
  }

  public async dashboardPublic(user:any){
    try {
      //data jumlah permohonan
      const jmlpermohonan = await this.Model.query().where('user_uuid', user.id).getCount()

      const jmldraftpermohonan = await this.Model.query().where("user_uuid", user.id).whereIn('status',["0","1","3"]).getCount()

      const jmlpermohonanproses = await this.Model.query().where("user_uuid", user.id).whereIn('status',["4"]).getCount()

      const jmlpermohonanpublish =await this.Model.query().where("user_uuid", user.id).whereIn('status',["5"]).getCount()

      return {
        jmlpermohonan: jmlpermohonan,
        jmldraftpermohonan: jmldraftpermohonan,
        jmlpermohonanproses: jmlpermohonanproses,
        jmlpermohonanpublish: jmlpermohonanpublish
      };
    } catch (error) {

    }
  }

  public async datachartperbulan(){
    try {
      const statistikperbulan:number[]  =[]

      const januari = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-01%']).getCount()
      const pebruari = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-02%']).getCount()
      const maret = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-03%']).getCount()
      const april = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-04%']).getCount()
      const mei = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-05%']).getCount()
      const juni = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-06%']).getCount()
      const juli = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-07%']).getCount()
      const agustus = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-08%']).getCount()
      const september = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-09%']).getCount()
      const oktober = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-10%']).getCount()
      const nopember = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-11%']).getCount()
      const desember = await this.Model.query().whereIn('status',['1','2','3','4','5']).whereRaw('created_at::text like ?',['2023-12%']).getCount()

      statistikperbulan.push(Number(januari))
      statistikperbulan.push(Number(pebruari))
      statistikperbulan.push(Number(maret))
      statistikperbulan.push(Number(april))
      statistikperbulan.push(Number(mei))
      statistikperbulan.push(Number(juni))
      statistikperbulan.push(Number(juli))
      statistikperbulan.push(Number(agustus))
      statistikperbulan.push(Number(september))
      statistikperbulan.push(Number(oktober))
      statistikperbulan.push(Number(nopember))
      statistikperbulan.push(Number(desember))

      return statistikperbulan
    } catch (error) {

    }
  }

  public async datachartperproses(){

    const datas:number[]= []

    const pengajuan = await this.Model.query().whereIn('status',[1,3]).getCount()
    const perbaikan = await this.Model.query().where('status',[2]).getCount()
    const verifikasi = await this.Model.query().where('status',[4]).getCount()
    const publish = await this.Model.query().where('status',[5]).getCount()


    datas.push(Number(pengajuan))
    datas.push(Number(perbaikan))
    datas.push(Number(verifikasi))
    datas.push(Number(publish))

    return datas;
  }

  public async datamaps(){
    try {
      const model = await this.Model.query().whereIn("status",[1,2,3,4,5]).orderBy("id","asc")

      const datas:{}[]=[]

      model.forEach(element => {
        const row ={}
        row['id']= element.id
        row['position']= {lat: element.lat, lng: element.lng}
        row['tooltip']= "<div><h4>"+ element.name +"</div><div>Inovator :  "+ element.inovatorNama + "</div><div><span> Alamat :"+ element.address+"</span><div>"
        row['icon']=  element.status== '1' ? "/images/riple-3.gif" : "/images/icon-marker-merah.png"
        row['draggable']= false
        row['visible']= true
        row['size']= element.status == '1' ? [52,52]: [32,32]
        datas.push(row)
      });

      return datas;

    } catch (error) {

    }
  }

  public async printPenilaian(){
    const model = await this.Model.query().whereIn('status',[1,2,3,4,5]).orderBy("finnaly_score", "asc")

    const datas:{}[]=[]

    let num = 1

    model.forEach(element => {
      const row ={}
      row['num']= num++
      row['noreg']= element.noreg
      row['name']= element.name
      row['inovator']= element.inovatorNama
      row['skor']= element.finnalyScore ? element.finnalyScore : "-"
      datas.push(row)
    });

    return datas;
  }
}

export default new InovationService
