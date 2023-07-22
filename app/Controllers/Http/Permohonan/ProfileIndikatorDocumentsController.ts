import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfileIndikatorDocumentService from 'App/Services/Permohonan/ProfileIndikatorDocumentService'

export default class ProfileIndikatorDocumentsController {
  public async index({params}: HttpContextContract) {
    const {profile_indikator_uuid}= params

    const result = await ProfileIndikatorDocumentService.lists(profile_indikator_uuid)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({params, request, response}: HttpContextContract) {
    const {profile_uuid, indikator_pemda_uuid, profile_indikator_uuid}= params
    const {nomor_dokumen, tanggal_dokumen, tentang, type_file, file_dokumen}= request.all()

    const payload={
      profile_uuid:profile_uuid,
      indikator_pemda_uuid: indikator_pemda_uuid,
      profile_indikator_uuid: profile_indikator_uuid,
      nomor_dokumen:nomor_dokumen,
      tanggal_dokumen:tanggal_dokumen,
      tentang:tentang,
      type_file:type_file,
      file_dokumen:file_dokumen
    }

    const result = await ProfileIndikatorDocumentService.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await ProfileIndikatorDocumentService.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request,response}: HttpContextContract) {
    const {profile_uuid, indikator_pemda_uuid, profile_indikator_uuid}= params
    const {nomor_dokumen, tanggal_dokumen, tentang, type_file, file_dokumen}= request.all()

    const payload={
      profile_uuid:profile_uuid,
      indikator_pemda_uuid: indikator_pemda_uuid,
      profile_indikator_uuid: profile_indikator_uuid,
      nomor_dokumen:nomor_dokumen,
      tanggal_dokumen:tanggal_dokumen,
      tentang:tentang,
      type_file:type_file,
      file_dokumen:file_dokumen
    }

    const result = await ProfileIndikatorDocumentService.update(payload, params.id)

    return response.status(result.code).send(result)

  }

  public async destroy({params,response}: HttpContextContract) {
    const result = await ProfileIndikatorDocumentService.deleted(params.id)

    return response.status(result.code).send(result)
  }
}
