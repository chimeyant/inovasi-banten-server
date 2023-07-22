import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, BelongsTo, HasMany, HasOne, beforeCreate, belongsTo, column, computed, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Indikator from './Indikator'
import Inovasi from './Inovasi'
import InovasiInformasi from './InovasiInformasi'
import InovasiDocument from './InovasiDocument'

export default class InovasiIndikator extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public inovasiUuid:string

  @column()
  public indikatorUuid:string

  @column()
  public informationCompleted:boolean

  @column()
  public status:boolean

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(inovasiIndikator:InovasiIndikator){
    inovasiIndikator.uuid = uuid()
  }

  @belongsTo(()=>Indikator, {foreignKey:"indikatorUuid", localKey:"uuid"})
  public indikator:BelongsTo<typeof Indikator>

  @belongsTo(()=> Inovasi, {foreignKey:"inovasiUuid", localKey:"uuid"})
  public inovasi:BelongsTo<typeof Inovasi>

  @hasOne(()=> InovasiInformasi,{localKey:"uuid", foreignKey:"inovasiIndikatorUuid"})
  public inovasiinformasi:HasOne<typeof InovasiInformasi>

  @hasMany(()=> InovasiDocument,{localKey:"uuid", foreignKey:"inovasiIndikatorUuid"})
  public inovasidocuments:HasMany<typeof InovasiDocument>

  @computed()
  public get datadisplay(){
    return{
      id: this.uuid,
      name: this.indikator.name,
      informasi: this.inovasiinformasi ? {class:'black--text', text:this.inovasiinformasi.informasi }  : {class:'grey--text', text: "Tidak Tersedia...!"} ,
      jmldoc: this.inovasidocuments.length,
      aksi: {
        id:this.uuid,
        inovasi_uuid: this.inovasiUuid,
        indikator_uuid: this.indikatorUuid,
        indikator_name: this.indikator.name
      }
    }
  }
}
