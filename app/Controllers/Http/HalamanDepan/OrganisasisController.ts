import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Organization from 'App/Models/Organization'

export default class OrganisasisController {
  public async index({params, response}: HttpContextContract) {
    const {page, itemsPerPage, search}= params
    const opds = await Organization.query().orderBy("id",'asc').paginate(page, itemsPerPage)

    const meta = opds.getMeta()
    const datas:{}[]= []

    opds.forEach(element => {
      const row = {}
      row['id']= element.uuid
      row['name']= element.name
      datas.push(row)
    });

    return response.status(200).json({
      success:true,
      code:200,
      message:'sukses',
      data:datas,
      meta:meta
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
