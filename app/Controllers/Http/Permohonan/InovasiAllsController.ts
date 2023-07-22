import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InovasiService from 'App/Services/Permohonan/InovasiService'

export default class InovasiAllsController {
  public async index({auth}: HttpContextContract) {
    const user = auth.user


    if(user?.authent==='superadmin'){
      const result = await InovasiService.superadminList()

      return result;
    }
    if(user?.authent==='administrator'){
      const result = await InovasiService.publisherList()

      return result;
    }
    if(user?.authent==='provinsi'){
      const result = await InovasiService.listall()

      return result;
    }
    if(user?.authent==='team-pengkaji'){
      const result = await InovasiService.verifikatorList()

      return result;
    }
    if(user?.authent==='kabkota'){
      const result = await InovasiService.kabkotaList(user.regencyCode)

      return result;
    }

  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params}: HttpContextContract) {
    const {id}= params

    const result = await InovasiService.verifikatorshow(id)

    return result;
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async setstatus({request, response, auth}){
    const user = auth.user
    const {inovasi_uuid, status, content} = request.all()

    const result = await InovasiService.setstatus(status,content, inovasi_uuid, user)

    return response.status(result.code).send(result)
  }
}
