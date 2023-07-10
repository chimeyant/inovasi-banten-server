import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransactionService from 'App/Controllers/Services/Manajemen/TransactionService'

export default class TransactionsController {
  public async index({request}: HttpContextContract) {
    const result = await TransactionService.list(request)

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params}: HttpContextContract) {
    const result = await TransactionService.show(params.id)

    return result;
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async import({request,response}:HttpContextContract){
    const {filename, sheetName, jenisPengobatan} = request.all()

    const result = await TransactionService.import(filename,sheetName, jenisPengobatan)

    return result;
  }

  public async updatecategory({request, response}:HttpContextContract){
    const {category_uuid, id}= request.all()

    const result = await TransactionService.updatecategory(category_uuid, id)

    return response.status(result.code).send(result)
  }

  public async updatestatus({request, response}:HttpContextContract){
    const {status, id}= request.all()

    const result = await TransactionService.updatestatus(status, id)

    return response.status(result.code).send(result)
  }
}
