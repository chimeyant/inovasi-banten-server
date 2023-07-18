import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { column, beforeSave,beforeCreate, BaseModel, scope, computed, beforeUpdate } from '@ioc:Adonis/Lucid/Orm'

export default class User extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: BigInt

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public authent:string

  @column()
  public avatar:string

  @column()
  public tingkat:string

  @column()
  public regencyCode:string

  @column()
  public opdUuid:string

  @column()
  public phone:string

  @column()
  public socialmedia:boolean

  @column()
  public rootUuid:string

  @column()
  public parentUuid:string

  @column()
  public status:boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }


 @beforeCreate()
  public static async createUUID(user:User){
    user.id = uuid()
  }

  @computed()
  public get datadisplay(){
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      authent: this.authent,
      status: this.status ? {color: 'green', text: 'Aktif'}:{color: 'red', text:'Tidak Aktif'}
    }
  }

  @computed()
  public get datarecord(){
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      authent: this.authent,
      regency_code: this.regencyCode,
      opd_uuid: this.opdUuid,
      status: this.status,
      phone: this.phone
    }
  }


  public static filterOn = scope((query, request)=>{
    const {search, sortBy, sortDesc} = request.only(['search','sortBy', 'sortDesc'])
    //const {search : string ,sortBy, sortDesc}= request.all();
    const qsortBy = sortBy? sortBy : 'name'
    const qsortDesc = sortDesc? 'desc': 'asc'
    query.select('id','name','email','authent', 'status').whereNot("authent",'superadmin')

    if(search){
      query.whereRaw('lower(name) like ?',['%'+ search.toLowerCase()+'%'] );
    }

    query.orderBy(qsortBy,qsortDesc)

    return query;
  })


}
