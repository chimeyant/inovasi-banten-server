import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class SinovicIndikator extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public sinovicUuid:string

  @column()
  public indikatorUuid:string

  @column()
  public indikatorName:string

  @column()
  public score: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(sinovicIndikator:SinovicIndikator){
    sinovicIndikator.uuid = uuid()
  }

  @computed()
  public get datadisplay(){
    return{
      id: this.uuid,
      name: this.indikatorName,
      score: this.score
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      sinovic_uuid: this.sinovicUuid,
      indikator_uuid: this.indikatorUuid,
      indikator_name: this.indikatorName,
      score: this.score
    }
  }
}
