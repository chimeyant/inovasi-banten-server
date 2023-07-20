import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Inovasi extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public opdUuid:string

  @column()
  public jenisUuid:string

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

  @computed()
  public get datadisplay(){
    return {
      id: this.uuid,
      name: this.name,
      tahapan: this.tahapan.replace('-'," ").toUpperCase(),
      kematangan: this.kematangan,
      opd:"",
      inidkator:"",
      status: this.status == '0' ? {color:'grey',text:"DRAFT"}:{color:'red',text:'NA'}
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      name: this.name
    }
  }
}
