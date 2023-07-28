import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/MasterData/UserValidator'
import UpdateProfilValidator from 'App/Validators/Utility/UpdateProfilValidator'
import UserService from 'App/Services/Utility/UserService'


export default class UsersController {
  public async index({request,auth,response}: HttpContextContract) {
    const user = auth.user
    if(user?.authent=='superadmin'){
      const result = await UserService.lists(request, user.id)
      return result;
    }
    if(user?.authent == 'administrator'){
      const result = await UserService.lists(request, user.id)
      return result;
    }else{
      return response.forbidden()
    }

  }

  public async create({}: HttpContextContract) {}

  public async store({request,response,auth}: HttpContextContract) {
    const user = auth.user
    const payload =request.only(['name','email','authent','regency_code','phone','opd_uuid','status','reset'])

    await request.validate(UserValidator)

    if(user?.authent=='superadmin'){
      const  result = await UserService.store(payload)

      return response.status(result.code).send(result)
    }
    if(user?.authent== 'administrator'){
      const  result = await UserService.store(payload)
      return response.status(result.code).send(result)
    }
    else{
      return response.forbidden()
    }
  }

  public async show({params}: HttpContextContract) {
    const result = await UserService.show(params.id)

    return result;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request,response,auth}: HttpContextContract) {
    const user = auth.user
    const payload = request.only(['name','email','authent','regency_code','phone','opd_uuid', 'status','reset'])

    await request.validate(UserValidator)

    if(user?.authent == 'superadmin'){
      const result=  await UserService.update(payload, params.id)
      return response.status(result.code).send(result)
    }

    if(user?.authent == 'administrator'){
      const result=  await UserService.update(payload, params.id)
      return response.status(result.code).send(result)
    }

    return response.forbidden()

  }

  public async destroy({params, response, auth}: HttpContextContract) {
    const user = auth.user

    if(user?.$attributes.authent== 'superadmin'){
      const result = await UserService.delete(params.id)
      return response.status(result.code).send(result)
    }

    if(user?.$attributes.authent== 'administrator'){
      const result = await UserService.delete(params.id)
      return response.status(result.code).send(result)
    }

    return response.forbidden()
  }

  public async userInfo({request,response,auth}: HttpContextContract){
    const user = await auth.user;
    const result = await UserService.info(user?.id)
    return result;
  }

  public async updateProfil({request,response,auth}:HttpContextContract){
    const user =  auth.user
    const payload = request.only(['name','avatar']);

    //validasi form
    await request.validate(UpdateProfilValidator)

    const result = await UserService.updateprofil(payload, user?.id)

    return response.status(result.code).send(result)

  }

  public async changePwd({request,response,auth}:HttpContextContract){
    const authuser = auth.user
    const {password} = request.all()

    const result = await UserService.changepassword(password, authuser.id)

    return response.status(result.code).send(result)

  }
}
