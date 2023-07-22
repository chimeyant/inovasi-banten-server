import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InovasiDocumentService from 'App/Services/Permohonan/InovasiDocumentService'

export default class InovasiDocumentsController {
  public async index({params}: HttpContextContract) {
    const {inovasi_indikator_uuid}= params

    const result =await InovasiDocumentService.lists(inovasi_indikator_uuid)

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({params, request, response}: HttpContextContract) {
    const {inovasi_uuid, indikator_uuid, inovasi_indikator_uuid}= params
    const {nomor_dokumen, tanggal_dokumen, tentang, type_file, file_dokumen}= request.all()

    const payload={
      inovasi_uuid: inovasi_uuid,
      indikator_uuid: indikator_uuid,
      inovasi_indikator_uuid:inovasi_indikator_uuid,
      nomor_dokumen:nomor_dokumen,
      tanggal_dokumen:tanggal_dokumen,
      tentang:tentang,
      type_file:type_file,
      file_dokumen:file_dokumen
    }

    const result = await InovasiDocumentService.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
