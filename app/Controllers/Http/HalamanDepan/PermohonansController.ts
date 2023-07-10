import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permohonan from 'App/Models/Permohonan'
import { string } from '@ioc:Adonis/Core/Helpers'
import Whatsapp from 'App/Helpers/Whatsapp'
import User from 'App/Models/User'

export default class PermohonansController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, telp,email, pekerjaan,kebutuhan,is_opd, opd_uuid,keterangan, tujuan}= request.all()

    try {
      const permohonan = new Permohonan
      permohonan.noregister = string.generateRandom(10)
      permohonan.name = name
      permohonan.telp = telp
      permohonan.email = email
      permohonan.pekerjaan = pekerjaan
      permohonan.kebutuhan = kebutuhan
      permohonan.isOpd = is_opd
      permohonan.opdUuid= opd_uuid
      permohonan.keterangan= keterangan
      permohonan.tujuan = tujuan
      await permohonan.save()


      //send message via whatsapp
      await Whatsapp.sendMessage(telp, "Hai..., "+ name + ". Permohonan anda akan segera kami proses dengan nomor registrasi anda adalah : "+ permohonan.noregister)

      //kirim notfikasi ke petugas
      const users = await User.query().where('recieve_message',true)

      users.forEach( async element => {
        await Whatsapp.sendMessage(element.phone ,"Hai..., "+ element.name + ". Telah masuk permohonan baru dengan nomor registrasi  : "+ permohonan.noregister + ", "+ kebutuhan)
      });
      return response.status(200).json({
        code:200,
        success:true,
        message:"Permohonan dataset berhasil dikirim..!"
      })

    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        message:"Opps..., terjadi kesalahan",
        errors:error
      })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
