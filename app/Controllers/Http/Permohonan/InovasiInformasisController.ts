import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InovasiInformasiService from 'App/Services/Permohonan/InovasiInformasiService'

export default class InovasiInformasisController {
  public async show({params}:HttpContextContract){
    const result = await InovasiInformasiService.show(params.inovasi_indikator_uuid)

    return result;
  }

  public async store({params, request, response}:HttpContextContract){
    const {informasi}= request.all()
    const result = await InovasiInformasiService.store(params.inovasi_indikator_uuid,informasi)

    return response.status(result.code).send(result)
  }
}
