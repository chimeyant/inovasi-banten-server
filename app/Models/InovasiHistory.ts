import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Inovasi from './Inovasi'
import User from './User'

export default class InovasiHistory extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public inovasiUuid:string

  @column()
  public userUuid:string

  @column()
  public title:string

  @column()
  public content:string

  @column()
  public status:string

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(inovasiHistory:InovasiHistory){
    inovasiHistory.uuid = uuid()
  }

  @belongsTo(()=> Inovasi,{foreignKey:"inovasiUuid",localKey:"uuid"})
  public inovasi:BelongsTo<typeof Inovasi>

  @belongsTo(()=>User,{foreignKey:"userUuid",localKey:"id"})
  public user:BelongsTo<typeof User>

  @computed()
  public get datadisplay(){
    return{
      id:this.uuid,
      user: this.user.name,
      title:this.title,
      content: this.content,
      status:this.status == '0' ? 'grey' : this.status == '1' ? 'orange' : this.status == '2' ? 'red' : this.status == '3' ? 'orange': this.status=='4'?'blue': this.status=='5'? 'lime' : 'green',
      tanggal: DateTime.fromISO(this.createdAt).toFormat("dd/MM/yyyy"),
      waktu: DateTime.fromISO(this.createdAt).toFormat("hh:mm:ss")
    }
  }
}
