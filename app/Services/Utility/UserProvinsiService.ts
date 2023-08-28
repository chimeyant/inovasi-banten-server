import User from "App/Models/User";
import {string} from "@ioc:Adonis/Core/Helpers"
import { MSG_FAILED_PROCESS, MSG_STORE_SUCCESS } from "App/Helpers/Lang";
import Whatsapp from "App/Helpers/Whatsapp";

export type UserProvinsiType={
  name:string,
  email:string,
  phone:string,
  opd_uuid: string,
  status:string,
}

class UserProvinsiService {
  public async lists(request, code:string){
    const {page, itemsPerPage}= request.only(['page','itemsPerPage'])
    const model = await User.query().withScopes((scopes)=> scopes.filterOnProvinsi(request)).where('regency_code', code).paginate(page,itemsPerPage)

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return {
      data:  datas,
      meta: model.getMeta()
    };
  }

  public async store(payload: UserProvinsiType, user_uuid:string){
    try {
      const password = await  string.generateRandom(8)
      const model = new User
      model.name = payload.name
      model.email = payload.email
      model.authent = 'provinsi-opd'
      model.password = password
      model.regencyCode = '36'
      model.phone = payload.phone
      model.opdUuid = payload.opd_uuid
      model.rootUuid = user_uuid
      model.parentUuid= user_uuid
      model.tingkat = '1'
      model.status = payload.status
      await model.save()

       //sand service whatsapp
       //kirim pesan wa
       const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ model.name.toUpperCase() + "\r\n\r\nSelamat Anda telah terdaftar sebagai akun pengguna pada sistem kami dengan data akun sebagai berikut :"+ "\r\nNama pengguna :  "+ model.email + "\r\nKata Sandi :  "+password+" \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

       await Whatsapp.sendMessage(payload.phone, pesan)

      return {
        code:200,
        success:true,
        message:MSG_STORE_SUCCESS,
        data: model.datadisplay
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async show(){}

  public async update(){}

  public async delete(){

  }
}

export default new UserProvinsiService
