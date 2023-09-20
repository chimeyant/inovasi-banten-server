import User from "App/Models/User"
import {string} from "@ioc:Adonis/Core/Helpers"
import { MSG_CHANGEPWD_SUCCESS, MSG_DELETE_SUCCESS, MSG_FAILED_PROCESS, MSG_STORE_SUCCESS, MSG_UPDATEPROFILE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import Whatsapp from "App/Helpers/Whatsapp"
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export type UserType ={
  name: string,
  email:string,
  authent:string,
  regency_code:string,
  opd_uuid: string,
  phone:string,
  status:boolean,
  reset:boolean,
}

export type UserProfileType ={
  name:string,
  avatar:string,
}



export type UserProvinceType={}

export type UserKabKotaType={}


class UserService {
  public async lists(request){
    const {page, itemsPerPage}= request.only(['page','itemsPerPage'])
    const model = await User.query().withScopes((scopes)=> scopes.filterOn(request)).paginate(page,itemsPerPage)

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return {
      data:  datas,
      meta: model.getMeta()
    };

  }
  public async store(payload:UserType){
    try {
      const password = string.generateRandom(8)
      const model = new User
      model.name= payload.name
      model.email = payload.email
      model.authent = payload.authent
      model.regencyCode = payload.regency_code ? payload.regency_code : '36'
      model.opdUuid = payload.opd_uuid
      model.phone = payload.phone
      model.password = password
      model.status = true
      await model.save()

      //sand service whatsapp
       //kirim pesan wa
       const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ model.name.toUpperCase() + "\r\n\r\nSelamat Anda telah terdaftar sebagai akun pengguna pada sistem kami dengan data akun sebagai berikut :"+ "\r\nNama pengguna :  "+ model.email + "\r\nKata Sandi :  "+password+" \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

       await Whatsapp.sendMessage(payload.phone, pesan)

      return {
        code: 200,
        success:true,
        message: MSG_STORE_SUCCESS,
        data: model
      }
    } catch (error) {
      return {
        code:500,
        success: true,
        message: MSG_FAILED_PROCESS,
        error: error
      }
    }
  }

  public async show(id:string){
    const model = await User.findBy('id',id)

    return model?.datarecord
  }

  public async update(payload,id:string){
    try {
      const model = await User.findBy("id", id)
      const password = string.generateRandom(8)

      if(payload.reset){
        model?.merge({
          name: payload.name,
          authent: payload.auth,
          regencyCode:payload.regency_code ? payload.regency_code:'36',
          opdUuid: payload.opd_uuid,
          phone: payload.phone,
          password: password,
          status: payload.status
        })
      }else{
        model?.merge({
          name: payload.name,
          authent: payload.auth,
          regencyCode:payload.regency_code,
          opdUuid: payload.opd_uuid,
          phone: payload.phone,
          status: payload.status
        })
      }



      await model?.save()

      //kirim pesan wa
      const pesan = "*INOVASI BANTEN* \r\n `Jaringan Inovasi Banten` \r\n\r\nHalo... \r\n"+ model?.name.toUpperCase() + "\r\n\r\nSelamat Anda telah terdaftar sebagai akun pengguna pada sistem kami dengan data akun sebagai berikut :"+ "\r\nNama pengguna :  "+ model?.email + "\r\nKata Sandi :  "+password+" \r\n\r\nSalam Inovasi,\r\nProvinsi Banten"

      await Whatsapp.sendMessage(payload.phone, pesan)

      return {
        code:200,
        success: true,
        message: MSG_UPDATE_SUCCESS,
        data: model?.datadisplay
      }
    } catch (error) {
      return {
        code: 500,
        success:false,
        message: MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async delete(id:string){
    try {
      const model = await User.find(id)
      await  model?.delete()

      return {
        code:200,
        success:true,
        message:MSG_DELETE_SUCCESS,
        data:{id:id}
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

  public async info(id:string){
    const model = await User.findBy('id',id)
    const data={}
    data['id']= model?.id
    data['name']=  model?.name
    data['email']= model?.email
    data['authent']= model?.authent
    data['avatar']= model?.avatar
    data['avatar_path']= model?.avatar ? model?.avatar ? Env.get("BASE_URL") + await Drive.getSignedUrl( "images/avatars/"+ model?.avatar):  Env.get("BASE_URL")+ await Drive.getSignedUrl( "images/avatars/avatar.png") : "/images/user.png"

    return data;
  }

  public async updateprofil(payload:UserProfileType,id:string){
    try {
      const model = await User.findBy("id",id)
      model?.merge({
        name: payload.name,
        avatar: payload.avatar
      })
      await model?.save()

      return{
        code:200,
        success:true,
        message:MSG_UPDATEPROFILE_SUCCESS,
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
      }
    }
  }

  public async changepassword(password:string, id:string){
     try {
      const model = await User.findBy("id", id)
      model?.merge({ password:password})
      await model?.save()

      return {
        code:200,
        success:true,
        message:MSG_CHANGEPWD_SUCCESS,
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_FAILED_PROCESS,
        error:error
      }
    }
  }

  public async getPhomeByOPD(id:string){
    const model = await User.findBy("opd_uuid",id)
    return model?.datarecord
  }

  public async showByEmail(email:any){
    const model = await User.findBy("email",email)

    return model;
  }

  public async registerByGoogle(payload:any){
    try {
      const password = string.generateRandom(8);
      const model = new User
      model.name = payload.name
      model.email = payload.email
      model.authent = payload.authent
      model.password = password
      model.socialmedia= true
      model.status = true
      await model.save()

      return {
        success:true,
        user: model
      }

    } catch (error) {
      return {
        success:false,
        user:{}
      }
    }
  }


}

export default new UserService
