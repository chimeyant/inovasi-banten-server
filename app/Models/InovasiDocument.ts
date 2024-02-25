import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class InovasiDocument extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public inovasiUuid:string

  @column()
  public indikatorUuid:string

  @column()
  public inovasiIndikatorUuid:string

  @column()
  public nomorDokumen:string

  @column()
  public tanggalDokumen:Date

  @column()
  public tentang:string

  @column()
  public typeFile:string

  @column()
  public fileDokumen:string

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(inovasiDokumen:InovasiDocument){
    inovasiDokumen.uuid = uuid()
  }

  @computed()
  public get datadisplay(){
    return{
      id: this.uuid,
      nomor_dokumen: this.nomorDokumen
      tanggal_dokumen: DateTime.fromJSDate(this.tanggalDokumen).toFormat("dd/MM/yyyy"),
      tentang: this.tentang,
      document:""
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      nomor_dokumen: this.nomorDokumen,
      tanggal_dokumen: DateTime.fromJSDate(this.tanggalDokumen).toFormat("yyyy-MM-dd"),
      tentang:   this.tentang,
      type_file: this.typeFile,
      document: this.fileDokumen
    }
  }
}
