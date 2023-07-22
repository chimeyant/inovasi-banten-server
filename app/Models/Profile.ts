import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, BelongsTo, HasMany, beforeCreate, belongsTo, column, computed, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Province from './Province'
import Regency from './Regency'
import Opd from './Opd'
import ProfileIndikator from './ProfileIndikator'

export default class Profile extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public name:string

  @column()
  public userUuid:string

  @column()
  public provinceCode:string

  @column()
  public regencyCode:string

  @column()
  public opdUuid:string

  @column()
  public opdName:string

  @column()
  public email:string

  @column()
  public phone:string

  @column()
  public namaAdmin:string

  @column()
  public jabatanAdmin:string

  @column()
  public alamat:string

  @column()
  public fileFaktaIntegritas:string

  @column()
  public logo:string

  @column()
  public status:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(profile:Profile){
    profile.uuid = uuid()
  }

  @belongsTo(()=> User, {foreignKey:"userUuid", localKey:"id"})
  public user:BelongsTo<typeof User>

  @belongsTo(()=> Province,{foreignKey:"provinceCode",localKey:"code"})
  public province:BelongsTo<typeof Province>

  @belongsTo(()=> Regency,{foreignKey:"regencyCode",localKey:"code"})
  public regency:BelongsTo<typeof Regency>

  @belongsTo(()=> Opd, {foreignKey:"opdUuid",localKey:"uuid"})
  public opd:BelongsTo<typeof Opd>

  @hasMany(()=> ProfileIndikator,{foreignKey:"profileUuid",localKey:"uuid"})
  public profileindikator:HasMany<typeof ProfileIndikator>


  @computed()
  public get datadisplay(){
    return {
      id: this.uuid,
    }
  }

  @computed()
  public  get datarecord(){
    return {
      id:this.uuid,
      name: this.name,
      user_uuid: this.userUuid,
      province_code: this.provinceCode,
      regency_code: this.regencyCode,
      opd_uuid: this.opdUuid,
      opd_name: this.opd.name,
      email: this.email,
      phone:this.phone,
      nama_admin: this.namaAdmin,
      jabatan_admin: this.jabatanAdmin,
      file_fakta_integritas: this.fileFaktaIntegritas,
      logo: this.logo,
      alamat:this.alamat,
      status: this.status
    }
  }

  @computed()
  public  get verifikatordatarecord(){
    return {
      id:this.uuid,
      name: this.name,
      user_uuid: this.userUuid,
      province_code: this.provinceCode,
      regency_code: this.regencyCode,
      opd_uuid: this.opdUuid,
      opd_name: this.opd.name,
      email: this.email,
      phone:this.phone,
      nama_admin: this.namaAdmin,
      jabatan_admin: this.jabatanAdmin,
      file_fakta_integritas: this.fileFaktaIntegritas,
      logo: this.logo,
      alamat:this.alamat,
      status: this.status,
      indikator:this.profileindikator
    }
  }
}
