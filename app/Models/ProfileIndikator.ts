import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, BelongsTo, HasMany, beforeCreate, belongsTo, column, computed, hasMany } from '@ioc:Adonis/Lucid/Orm'
import IndikatorPemda from './IndikatorPemda'
import ProfileIndikatorDocument from './ProfileIndikatorDocument'

export default class ProfileIndikator extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public profileUuid:string

  @column()
  public indikatorPemdaUuid:string

  @column()
  public informasi:string

  @column()
  public status:boolean

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(profileIndikator:ProfileIndikator){
    profileIndikator.uuid = uuid()
  }

  @belongsTo(()=> IndikatorPemda,{foreignKey:"indikatorPemdaUuid",localKey:"uuid"})
  public indikatorpemda:BelongsTo<typeof IndikatorPemda>

  @hasMany(()=> ProfileIndikatorDocument,{localKey:"uuid",foreignKey:"profileIndikatorUuid"})
  public profiledocuments:HasMany<typeof ProfileIndikatorDocument>

  @computed()
  public get datadisplay(){
    return {
      id:this.uuid,
      indikator: this.indikatorpemda.name,
      informasi: this.informasi,
      jmldoc: this.profiledocuments.length,
      aksi:{
        id: this.uuid,
        profile_uuid:this.profileUuid,
        indikator_pemda_uuid: this.indikatorPemdaUuid,
        indikator_pemda_name: this.indikatorpemda.name,
        informasi: this.informasi
      }
    }
  }
}
