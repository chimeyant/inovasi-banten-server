import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid } from "uuid"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public code:string

  @column()
  public name:string

  @column()
  public icon:string

  @column()
  public status:boolean

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(category:Category){
    category.uuid = uuid()
  }

  @computed()
  public get datadisplay(){
    return {
      id:this.uuid,
      code: this.code,
      name:this.name,
      icon: this.icon,
      status: this.status ? {color:'green', text:"Aktif"}: {color:'red', text: "Tidak Aktif"},
      aksi: {
        id: this.uuid,
        name: this.name
      }
    }
  }

  @computed()
  public get datarecord(){
    return {
      id: this.uuid,
      code: this.code,
      name: this.name,
      icon: this.icon,
      status:this.status
    }
  }

  @computed()
  public get combo(){
    return{
      value:this.uuid,
      text:this.name
    }
  }



}
