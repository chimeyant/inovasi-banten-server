import { DateTime } from 'luxon'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Urusan extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public img:string

  @column()
  public status:boolean

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(urusan:Urusan){
    urusan.uuid = uuid()
  }

  @computed()
  public get datadisplay(){
    return {
      id: this.uuid,
      name: this.name,
      img:"",
      status: this.status ? {color:'green', text:"Aktif"}: {color:'red', text:"Tidak Aktif"}
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      name: this.name,
      img: this.img,
      status: this.status
    }
  }

}
