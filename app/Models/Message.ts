import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Message extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public fromUserUuid:string

  @column()
  public toUserUuid:string

  @column()
  public title:string

  @column()
  public body:string

  @column()
  public sendedDate:DateTime

  @column()
  public recieveDate:DateTime

  @column()
  public deletedAt:DateTime


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(message:Message){
    message.uuid = uuid()
  }

  @computed()
  public get datadisplay(){
    return {
      id: this.uuid,
      title: this.title,
      body: this.body,
      sended_at: this.sendedDate ? DateTime.fromISO(this.sendedDate).toFormat("dd/MM/yyyy h:m:s"): "",
      recieve_at: this.recieveDate ? DateTime.fromFormat(this.recieveDate).toFormat("dd/MM/yyy h:m:s"):"",
      status: this.recieveDate? {color:'green',text:'Diterima'} : {color:'red', text:'Belum Diterima'}
    }
  }

  @computed()
  public get datarecord(){
    return{
      id:this.uuid,
      from_user_uuid: this.fromUserUuid,
      to_user_uuid:this.toUserUuid,
      title:this.title,
      body: this.body,
    }
  }
}
