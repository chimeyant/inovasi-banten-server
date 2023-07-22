import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InovasiService from 'App/Services/Permohonan/InovasiService'

export default class InovasisController {
  public async index({auth}: HttpContextContract) {
    const user = auth.user

    const result = await InovasiService.lists(user?.opdUuid)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response, auth}: HttpContextContract) {
    const user = auth.user

    const payload = request.only(['name','jenis_inovasi_uuid','urusan_uuid','bentuk_uuid','inisiator','waktu_uji','waktu_penerapan','tahapan','tahun','rancang_bangun','tujuan','manfaat','hasil','file_anggaran','file_profil_bisnis','skor','inovator_nama','inovator_phone','inovator_instansi','foto','video','youtube','province_code','regency_code','district_code','village_code','alamat','alamat_dalam_peta','lat','lng'])


    const payloaduser={
      'id': user?.id,
      'name':  user?.name,
      'email': user?.email,
      'authent': user?.authent,
      'opdUuid': user?.opdUuid
    }

    const result = await InovasiService.store(payload,payloaduser)

    return response.status(result.code).send(result)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({params, response, auth}: HttpContextContract) {
    const user = auth.user

    const result =await InovasiService.deleted(params.id, user)

    return response.status(result.code).send(result)
  }

  public async push({request, response,auth}:HttpContextContract){
    const {id}= request.all()
    const user = auth.user

    const result = await InovasiService.push(id,user)

    return response.status(result.code).send(result)
  }

  public async pull({request, response,auth}:HttpContextContract){
    const user = auth.user
    const {id}= request.all()

    const result = await InovasiService.pull(id,user)

    return response.status(result.code).send(result)
  }
}
