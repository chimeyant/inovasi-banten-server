import { MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS } from "App/Helpers/Lang";
import Inovasi from "App/Models/Inovasi"

export type InovasiType={
  name:string,
  jenis_uuid:string,
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
    const model = await Inovasi.query().where("opd_uuid", opd_uuid).orderBy("id",'asc')

    const datas:{}[]= []

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  public async store(payload:InovasiType, user:UserType){
    try {
      const model = new Inovasi
      model.name = payload.name
      model.opdUuid = user.opdUuid
      model.jenisUuid = payload.jenis_uuid
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
      model.lat = payload.lat
      model.lng = payload.lng
      model.createdUserUuid = user.id
      model.status ="0" //0: Status Draft
      await model.save()

      //create inovasi indikator


      //create inovasi informasi

      return {
        code:200,
        success: true,
        message:"Proses tambah permohonan berhasil disimpan sebagai draft..!",
        data: model.datadisplay
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
}

export default new InovasiService
