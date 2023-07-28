import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class FileManagement extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name: string

  @column()
  public ext: string

  @column()
  public size: number

  @column()
  public type:string

  @column()
  public mime:string

  @column()
  public ip:string

  @column()
  public userUuid:string

  @column()
  public used:boolean

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(filemanagement:FileManagement){
    filemanagement.uuid= uuid()
  }

  @computed()
  public get datadisplay(){
    return {
      name: this.name,
      ext: this.ext,
      size: this.size,
      date: DateTime.fromISO(this.createdAt).toFormat("dd/MM/yyyy HH:m:s"),
      status: this.ext == 'pdf' ? {color:'green', text:'Trusted'} : this.ext == 'png' ? {color:'green', text:'Trusted'} : this.ext == 'jpg' ? {color:'green', text: 'Trusted'} : this.ext == 'jpeg' ? {color: 'green', text:'Trusted'} : this.ext == 'svg' ? {color:'green', text:'Trusted'} : this.ext == 'doc' ? {color:'green', text:'Trusted'} : this.ext=='docx' ? {color:'green',text:'Trusted' } : this.ext=='xls' ? {color:'green',text:'Trusted'} : this.ext == 'xlsx' ? {color:'green',text:'Trusted'}:{color:'red',text: 'UnTursted'}
    }
  }
}
