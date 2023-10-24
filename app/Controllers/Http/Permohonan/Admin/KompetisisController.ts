import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryService from 'App/Services/MasterData/CategoryService'
import InovationService from 'App/Services/Permohonan/InovationService'

export default class KompetisisController {
  protected Service = InovationService
  protected CategorySvc = CategoryService

  public async index({auth}: HttpContextContract) {
    const user = auth.user

    const category = await this.CategorySvc.showByCode("KMP")

    const payload ={
      user: user,
      category: category
    }

    const result = await this.Service.lists(payload)

    return result

  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params}: HttpContextContract) {
    const  result = await this.Service.show(params.id)

    return result;
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async verifdoc({request, response, auth}:HttpContextContract){
    const user = auth.user
    const {id, status, pesan}=  request.all()

    const result= await this.Service.verifdoc(id, status, pesan,user)

    return response.status(result.code).send(result)
  }

  public async publish({params, response}:HttpContextContract){
    const result = await this.Service.publish(params.id)

    return response.status(result.code).send(result)
  }

  public async unpublish({params, response}){
    const result = await this.Service.unpublish(params.id)

    return response.status(result.code).send(result)
  }
}
