import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Sponsor extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public logo:string

  @column()
  public website:string

  @column()
  public status:boolean

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(sponsor:Sponsor){
    sponsor.uuid = uuid()
  }

  @computed()
  public get datadisplay(){
    return{
      id:this.uuid,
      name: this.name,
      website: this.website,
      status: this.status ? {color:'green',text:'Aktif'}:{color:'red', text:'Non Aktif'}
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      name: this.name,
      logo: this.logo,
      website: this.website,
      status: this.status,
    }
  }
}
