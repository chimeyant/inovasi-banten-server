import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export default class IndikatorPemda extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public categoryUuid:string

  @column()
  public name:string

  @column()
  public skor:number

  @column()
  public status:boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(indikatorPemda:IndikatorPemda){
    indikatorPemda.uuid = uuid()
  }

  @belongsTo(()=> Category,{foreignKey:"categoryUuid", localKey:"uuid"})
  public category:BelongsTo<typeof Category>

  @computed()
  public get datadisplay(){
    return{
      id: this.uuid,
      category: this.category ? this.category.name :'',
      name: this.name,
      skor:this.skor,
      status: this.status ? {color:'green',text:"Aktif"}:{color:'red',text:"Tidak Aktif"},
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      category_uuid: this.categoryUuid,
      name: this.name,
      skor: this.skor,
      status: this.status
    }
  }
}
