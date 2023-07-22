import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfileService from 'App/Services/Permohonan/ProfileService'

export default class ProfilsController {
  public async index({auth}: HttpContextContract) {
    const user = auth.user

    const result = await ProfileService.show(user?.regencyCode)

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({ response, auth}: HttpContextContract) {
    const user = auth.user

    // if(!(user?.authent == 'provinsi') || !(user?.authent == 'kabkota') ){
    //   return response.status(401).send({
    //     code:401,
    //     success:false,
    //     message:"Access Denied"
    //   })
    // }

    const payload={
      user_uuid: user?.id,
      province_code:'36',
      regency_code:user?.regencyCode,
      opd_uuid: user?.opdUuid,
      opd_name:"",
      email:user?.email,
      phone:user?.phone,
      jabatan_admin:null,
      file_fakta_integritas:null,
      logo:null,
      status:0
    }

    const result = await ProfileService.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({auth}: HttpContextContract) {
    const user = auth.user

    const result = await ProfileService.show(user?.regencyCode)

    return result

  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name, opd_name, nama_admin, jabatan_admin, phone, email, alamat, file_fakta_integritas, logo} = request.all()

    const payload ={
      name:name,
      opd_name:opd_name,
      nama_admin:nama_admin,
      jabatan_admin:jabatan_admin,
      phone:phone,
      email:email,
      alamat:alamat,
      file_fakta_integritas:file_fakta_integritas,
      logo:logo,
    }


    const result = await ProfileService.update(payload, id)


    return response.status(result.code).send(result)
  }

  public async destroy({}: HttpContextContract) {}

  public async showbyregency({params}:HttpContextContract){
    const {regency_code}=params

    const result = await ProfileService.showByRegency(regency_code)

    return result;
  }


}
