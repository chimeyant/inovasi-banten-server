import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Opd from './Opd'

export default class Kompetisi extends compose(BaseModel,SoftDeletes ){
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public categoryUuid:string

  @column()
  public name:string

  @column()
  public description:string

  @column()
  public startDate:string

  @column()
  public endDate:string

  @column()
  public status:boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(kompetisi:Kompetisi){
    kompetisi.uuid = uuid()
  }

  @belongsTo(()=> Category,{foreignKey:"categoryUuid",localKey:"uuid"})
  public category:BelongsTo<typeof Category>



  @computed()
  public get datadisplay(){
    return{
      id: this.uuid,
      category_name: this.category.name,
      name: this.name,
      start_date: DateTime.fromJSDate( this.startDate).toFormat("dd/MM/yyyy"),
      end_date: DateTime.fromJSDate(this.endDate).toFormat('dd/MM/yyyy'),
      status: this.status ? {color:'green', text:"Aktif"}:{color:'red', text:'Tidak Aktif'}
    }
  }

  @computed()
  public get datarecord(){
    return{
      id:this.uuid,
      category_uuid: this.categoryUuid,
      name: this.name,
      description:this.description,
      start_date: DateTime.fromJSDate(this.startDate).toFormat("yyyy-MM-dd"),
      end_date: DateTime.fromJSDate(this.endDate).toFormat('yyyy-MM-dd'),
      status: this.status
    }
  }

  @computed()
  public get combo(){
    return{
      value: this.uuid,
      text: this.name
    }
  }
}
