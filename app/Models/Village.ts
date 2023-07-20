import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Village extends  compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public districtCode:string

  @column()
  public code:string

  @column()
  public name:string

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(village:Village){
    village.uuid = uuid()
  }

  @computed()
  public get datadisplay(){
    return{
      id: this.uuid,
      code: this.code,
      name:this.name
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      district_code: this.districtCode,
      code: this.code,
      name: this.name
    }
  }

  @computed()
  public get combo(){
    return{
      value:this.code,
      text:this.name
    }
  }
}
