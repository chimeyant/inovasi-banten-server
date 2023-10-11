import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { BaseModel, beforeCreate, column,belongsTo,BelongsTo, computed } from '@ioc:Adonis/Lucid/Orm'
import Kompetisi from './Kompetisi'
import Opd from './Opd'
import Regency from './Regency'

export default class Sinovic extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public noreg:string

  @column()
  public tingkat:string


  @column()
  public opdUuid:string

  @column()
  public name:string

  @column()
  public jenisUuid:string

  @column()
  public kompetisiUuid:string

  @column()
  public urusanUuid:string

  @column()
  public kelompok:string

  @column()
  public inisiator:string

  @column()
  public bentukUuid:string

  @column()
  public waktuUji:string

  @column()
  public waktuPenerapan:string

  @column()
  public tahapan:string

  @column()
  public youtube:string

  @column()
  public suratPernyataanImplementasi:string

  @column()
  public suratPernyataanIdentitas:string

  @column()
  public suratPernyataanKetersediaanReplikasi:string

  @column()
  public ringkasan:string

  @column()
  public ringkasanAtt:string

  @column()
  public latarBelakang:string

  @column()
  public latarBelakangAtt:string

  @column()
  public kebaruan:string

  @column()
  public kebaruanAtt:string

  @column()
  public implementasi:string

  @column()
  public implementasiAtt: string

  @column()
  public signifikansi:string

  @column()
  public signifikansiAtt:string

  @column()
  public adaptabilitas:string

  @column()
  public adaptabilitasAtt:string

  @column()
  public sumberDaya:string

  @column()
  public sumberDayaAtt:string

  @column()
  public strategiKeberlanjutan:string

  @column()
  public strategiKeberlanjutanAtt:string

  @column()
  public inovatorNama:string

  @column()
  public inovatorTelp:string

  @column()
  public inovatorInstansi:string

  @column()
  public inovatorProvinceCode:string

  @column()
  public inovatorRegencyCode:string

  @column()
  public foto:string

  @column()
  public provinceCode:string

  @column()
  public regencyCode:string

  @column()
  public districtCode:string

  @column()
  public villageCode:string

  @column()
  public address:string

  @column()
  public lat:string

  @column()
  public lng:string

  @column()
  public tempScore:number

  @column()
  public finnalyScore:number

  @column()
  public userUuid:string

  @column()
  public status:string



  @column()
  public deletedAt:DateTime


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(sinovic: Sinovic){
    sinovic.uuid = uuid();
  }

  @belongsTo(()=>Kompetisi,{localKey:"uuid", foreignKey:"kompetisiUuid"})
  public kompetisi: BelongsTo<typeof Kompetisi>

  @belongsTo(()=> Opd, {localKey:"uuid", foreignKey:"opdUuid"})
  public opd:BelongsTo<typeof Opd>

  @belongsTo(()=> Regency, {foreignKey:"regencyCode",localKey:"code"})
  public regency: BelongsTo<typeof Regency>

  @computed()
  public get datadisplay(){
    return{
      id:this.uuid,
      noreg: this.noreg,
      name: this.name,
      opd: "",
      score: this.finnalyScore ? this.finnalyScore : 0,
      status:this.status == '0' ? {color:'grey', text:'DRAFT'}:this.status=='1'? {color:'orange', text:'Pengajuan'}: this.status=='2'? {color:'red', text:'Ditolak'}: this.status=='3'? {color:'orange', text:'Pengajuan Ulang'}: this.status=='4'? {color:'green', text:'Terverifikasi'} :this.status=='5'? {color:'blue', text:'Publish'} :{color:'red', text:'NA'}
    }
  }



  @computed()
  public get datarecord(){
    return{
      id:this.uuid,
      tingkat: this.tingkat,
      opd_uuid: this.opdUuid,
      name: this.name,
      jenis_uuid:this.jenisUuid,
      kompetisi_uuid: this.kompetisiUuid,
      urusan_uuid:this.urusanUuid,
      kelompok:this.kelompok,
      inisiator: this.inisiator,
      bentuk_uuid:this.bentukUuid,
      waktu_uji:DateTime.fromJSDate(this.waktuUji).toFormat('yyyy-MM-dd'),
      waktu_penerapan: DateTime.fromJSDate(this.waktuPenerapan).toFormat("yyyy-MM-dd"),
      tahapan: this.tahapan,
      youtube: this.youtube,
      surat_pernyataan_implementasi: this.suratPernyataanImplementasi,
      surat_pernyataan_identitas: this.suratPernyataanIdentitas,
      surat_pernyataan_ketersediaan_replikasi: this.suratPernyataanKetersediaanReplikasi,
      ringkasan: this.ringkasan,
      ringkasan_att: this.ringkasanAtt,
      latar_belakang: this.latarBelakang,
      latar_belakang_att: this.latarBelakangAtt,
      kebaruan: this.kebaruan,
      kebaruan_att: this.kebaruanAtt,
      implementasi: this.implementasi,
      implementasi_att: this.implementasiAtt,
      signifikansi: this.signifikansi,
      signifikansi_att: this.signifikansiAtt,
      adaptabilitas:  this.adaptabilitas,
      adaptabilitas_att: this.adaptabilitasAtt,
      sumber_daya: this.sumberDaya,
      sumber_daya_att: this.sumberDayaAtt,
      strategi_keberlanjutan: this.strategiKeberlanjutan,
      strategi_keberlanjutan_att: this.strategiKeberlanjutanAtt,
      inovator_nama: this.inovatorNama,
      inovator_telp: this.inovatorTelp,
      inovator_instansi: this.inovatorInstansi,
      inovator_province_code: this.inovatorProvinceCode,
      inovator_regency_code: this.inovatorRegencyCode,
      foto: this.foto,
      province_code: this.provinceCode,
      regency_code: this.regencyCode,
      district_code: this.districtCode,
      village_code: this.villageCode,
      address: this.address,
      lat: this.lat,
      lng: this.lng,
      temp_score: this.tempScore,
      finnaly_score:this.finnalyScore,
      status: this.status,
    }
  }

}
