import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Opd extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public code:string

  @column()
  public name:string

  @column()
  public status:boolean

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(opd:Opd){
    opd.uuid = uuid()
  }

  @computed()
  public get datadisplay(){
    return{
      id:this.uuid,
      code: this.code,
      name: this.name,
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      code: this.code,
      name: this.name,
    }
  }

  @computed()
  public get combo(){
    return{
      value: this.uuid,
      text: this.name,
    }
  }
}
