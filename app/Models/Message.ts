import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

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
  public sendedAt:DateTime

  @column()
  public recieveAt:DateTime

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

  @belongsTo(()=> User, {foreignKey:"fromUserUuid", localKey:"id"})
  public fromuser: BelongsTo<typeof User>

  @belongsTo(()=> User, {foreignKey:'toUserUuid', localKey:"id"})
  public touser:BelongsTo<typeof User>


  @computed()
  public get datadisplay(){
    return {
      id: this.uuid,
      title: this.title,
      body: this.body,
      sended_at: this.sendedAt ? DateTime.fromJSDate(this.sendedAt).toFormat("dd/MM/yyyy h:m:s"): "",
      recieve_at: this.recieveAt ? DateTime.fromISO(this.recieveAt).toFormat("dd/MM/yyy h:m:s"):"",
      status: this.recieveAt? {color:'green',text:'Diterima'} : {color:'red', text:'Belum Diterima'}
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
