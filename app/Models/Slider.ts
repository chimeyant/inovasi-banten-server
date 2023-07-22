import { DateTime } from 'luxon'
import {v4 as uuid } from "uuid"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Slider extends compose(BaseModel, SoftDeletes ){
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public title:string

  @column()
  public subtitle:string

  @column()
  public content:string

  @column()
  public path:string

  @column()
  public topImage:string

  @column()
  public bottomImage:string

  @column()
  public priorityStatus:boolean

  @column()
  public priorityNumber:number

  @column()
  public status:boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUuid(slider:Slider){
    slider.uuid=uuid()
  }

  @computed()
  public get datadisplay(){
    return{
      id:this.uuid,
      title: this.title,
      status: this.status ? {color:'green', text:"Aktif"}:{color:"red", text:"Tidak Aktif"}
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      title:this.title,
      subtitle:this.subtitle,
      content: this.content,
      top_image:this.topImage,
      bottom_image:this.bottomImage,
      priority_status: this.priorityStatus,
      priority_number:this.priorityNumber,
      status: this.status,
    }
  }

  @computed()
  public get datapublish(){
    return{
      id:this.uuid,
      title:this.title,
      subtitle:this.subtitle,
      content:this.content,
    }
  }
}
