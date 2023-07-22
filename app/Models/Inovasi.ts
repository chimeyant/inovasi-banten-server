import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, BelongsTo, HasMany, beforeCreate, belongsTo, column, computed, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Opd from './Opd'
import JenisInovasi from './JenisInovasi'
import Urusan from './Urusan'
import Bentuk from './Bentuk'
import Regency from './Regency'
import District from './District'
import Village from './Village'
import InovasiIndikator from './InovasiIndikator'
import User from './User'

export default class Inovasi extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public nomorRegister:string

  @column()
  public opdUuid:string

  @column()
  public jenisInovasiUuid:string

  @column()
  public urusanUuid:string

  @column()
  public bentukUuid:string

  @column()
  public inisiator:string

  @column()
  public waktuUji:Date

  @column()
  public waktuPenerapan:Date

  @column()
  public tahapan:string

  @column()
  public kematangan:number

  @column()
  public rancangBangun:string

  @column()
  public tujuan:string

  @column()
  public manfaat:string

  @column()
  public hasil:string

  @column()
  public fileAnggaran:string

  @column()
  public fileProfilBisnis:string

  @column()
  public skor:number

  @column()
  public tahun:number

  @column()
  public latarBelakang:string

  @column()
  public regulasi:string

  @column()
  public sosialisasiKebijakan:string

  @column()
  public bimtek:string

  @column()
  public layananPengaduan:string

  @column()
  public permasalahan:string

  @column()
  public inovatorNama:string

  @column()
  public inovatorPhone:string

  @column()
  public inovatorInstansi:string

  @column()
  public inovatorProvinceCode:string

  @column()
  public inovatorRegencyCode:string

  @column()
  public foto:string

  @column()
  public video:string

  @column()
  public youtube:string

  @column()
  public provinceCode:string

  @column()
  public regencyCode:string

  @column()
  public districtCode:string

  @column()
  public villageCode:string

  @column()
  public alamat:String

  @column()
  public alamatDalamPeta:String

  @column()
  public lat:string

  @column()
  public lng:string

  @column()
  public sendingDate:Date

  @column()
  public sendingUserUuid:string

  @column()
  public verifiedDate:Date

  @column()
  public verifiedUserUuid:string

  @column()
  public publishDate:Date

  @column()
  public publishUserUuid:string

  @column()
  public deletedUserUuid:string

  @column()
  public updatedUserUuid:string

  @column()
  public createdUserUuid:string

  @column()
  public status:string

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(inovasi:Inovasi){
    inovasi.uuid = uuid()
  }

  @belongsTo(()=>User,{foreignKey:"createdUserUuid",localKey:"id"})
  public user:BelongsTo<typeof User>

  @belongsTo(()=> Opd,{foreignKey:"opdUuid",localKey:"uuid"})
  public opd:BelongsTo<typeof Opd>

  @belongsTo(()=> JenisInovasi,{foreignKey:"jenisInovasiUuid", localKey:"uuid"})
  public jenisinovasi:BelongsTo<typeof JenisInovasi>

  @belongsTo(()=> Urusan,{foreignKey:"urusanUuid",localKey: "uuid"})
  public urusan:BelongsTo<typeof Urusan>

  @belongsTo(()=> Bentuk,{foreignKey:"bentukUuid", localKey:"uuid"})
  public bentuk:BelongsTo<typeof Bentuk>

  @belongsTo(()=> Regency,{foreignKey:"regencyCode",localKey:"code"})
  public regency:BelongsTo<typeof Regency>

  @belongsTo(()=>District,{foreignKey:"districtCode",localKey:"code"})
  public district:BelongsTo<typeof District>

  @belongsTo(()=> Village,{foreignKey:"villageCode",localKey:"code"})
  public village:BelongsTo<typeof Village>

  @hasMany(()=> InovasiIndikator,{foreignKey:"inovasiUuid",localKey:"uuid"})
  public inovasiindikators:HasMany<typeof InovasiIndikator>




  @computed()
  public get datadisplay(){
    return {
      id: this.uuid,
      name: this.name,
      tahapan: this.tahapan.replace('-'," ").toUpperCase(),
      kematangan: this.kematangan,
      opd:this.opd.name,
      inidkator:"",
      status: this.status == '0' ? {color:'grey',text:"DRAFT"}: this.status=='1' ? {color:'orange',text:'Menungu Verifikasi'}: this.status=='2'?{color:'red', text:'Perbaikan'}: this.status=='3'? {color:'orange',text:'Menunggu Verfikasi'}:this.status =='4' ? {color:'blue', text:'Dokumen Terverifikasi'}:this.status=='5'?{color:'lime',text:'Substansi Terverifikasi'}:{color:'green',text:'Publish'}
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      name: this.name
    }
  }

  @computed()
  public get datadisplayverifikator(){
    return {
      id: this.uuid,
      name: this.name,
      tahapan: this.tahapan.replace('-'," ").toUpperCase(),
      kematangan: this.kematangan,
      opd:this.opd.name,
      inidkator:"",
      status: this.status == '0' ? {color:'grey',text:"DRAFT"}: this.status=='1' ? {color:'orange',text:'Permohonan Baru'}: this.status=='2'?{color:'red', text:'Perbaikan'}: this.status=='3'? {color:'orange',text:'Permohonan Perbaikan'}:this.status =='4' ? {color:'blue', text:'Dokumen Terverifikasi'}:this.status=='5'?{color:'lime',text:'Substansi Terverifikasi'}:{color:'green',text:'Publish'}
    }
  }

  @computed()
  public get dataverifikatorrecord(){
    return{
      id:this.uuid,
      opd_uuid:this.opdUuid,
      regency_code:this.opd.regencyCode,
      nomor_register:this.nomorRegister,
      name: this.name,
      jenisinovasi:this.jenisinovasi.name,
      urusan: this.urusan.name,
      inisiator:this.inisiator,
      bentuk:this.bentuk.name,
      waktu_uji: DateTime.fromJSDate(this.waktuUji).toFormat("dd/MM/yyyy"),
      waktu_penerapan: DateTime.fromJSDate(this.waktuPenerapan).toFormat("dd/MM/yyyy"),
      tahapan: this.tahapan.toUpperCase().replace("-"," "),
      rancang_bangun: this.rancangBangun,
      tujuan: this.tujuan,
      manfaat: this.manfaat,
      hasil:this.hasil,
      nama_inovator:this.inovatorNama,
      telp: this.inovatorPhone,
      instansi: this.inovatorInstansi,
      kabupaten: this.regency.name,
      kecamatan: this.district.name,
      desa:this.village.name,
      alamat:this.alamat,
      inovasiindikators:this.inovasiindikators,

    }
  }
}
