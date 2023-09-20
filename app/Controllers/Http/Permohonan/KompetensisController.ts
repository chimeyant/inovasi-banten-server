import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryService from 'App/Services/MasterData/CategoryService'
import KompetisiService from 'App/Services/Permohonan/KompetisiService'

export default class KompetensisController {
  protected Service = KompetisiService
  protected CategorySvc = CategoryService

  public async index({}: HttpContextContract) {
    const result = await this.Service.lists()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['category_uuid','name','description','start_date','end_date','status'])

    const result = await this.Service.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await this.Service.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params,request, response}: HttpContextContract) {
    const payload = request.only(['category_uuid','name','description','start_date','end_date','status'])

    const result = await this.Service.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await this.Service.delete(params.id)

    return response.status(result.code).send(result)
  }

  public async comboSinovic(){
    const category = await this.CategorySvc.showByCode('KIPP')

    const result = await this.Service.combo(category?.id)

    return result
  }

  public async comboIga(){
    const category = await this.CategorySvc.showByCode('IID')

    const result = await this.Service.combo(category?.id)

    return result
  }

  public async combo({params}:HttpContextContract){
    const {code}= params

    const category = await this.CategorySvc.showByCode(code)

    const result = await this.Service.combo(category?.id)

    return result
  }
}
