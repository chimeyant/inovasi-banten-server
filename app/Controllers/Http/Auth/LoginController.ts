 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/Utility/UserService';

export default class LoginController {
  public async login({request,response, auth}: HttpContextContract){
    const {email, password}= request.all()
    try {
      const token = await auth.use("api").attempt(email,password, {expiresIn:"720mins"})

      return response.status(200).json({
        code :200,
        success:true,
        response:{
          message: "Proses login berhasil",
          token:token,
        },
      });
    } catch (error) {
      return response.send("Invalid credential..!" + error)
    }
  }

  public async loginWithGoogle({ally, auth, response}:HttpContextContract){

    try {
      if(await auth.check()){
        return response.notAcceptable()
      }

      const provider = ally.use('google').stateless()

      return response.send(await provider.redirectUrl())

    } catch (error) {
      return error
    }
  }
  public async googleCallback({ally, auth, response}:HttpContextContract){

    try {
      if(await auth.check()){
        return response.notAcceptable()
      }

      //open provider
      const provider = ally.use('google').stateless()

      if(provider.hasError()){
        return response.status(500).send({
          code:500,
          success:false,
          message: await provider.getError()
        })
      }

      const {token}= await provider.accessToken()
      const providerUser = await provider.userFromToken(token)

      //check user avalaible
      // const usercheck = await UserService.checkUser(providerUser.email)


      const user = await UserService.showByEmail(providerUser.email)

      if(!user){
        //create new user
        const payload={
          name: providerUser.name,
          email: providerUser.email,
          authent:'kompetisi',
          avatar: providerUser.avatarUrl,
          google_token: token,
          status: true
        }

        const registered = await UserService.registerByGoogle(payload)

        if(!registered.success){
          return{
            code: 500,
            success:false,
            message:"SIlahkan Ulang Kembali"
          }
        }else{
          const oat = await auth.use('api').login(registered.user, {expiresIn: '7days'})
          return {
            code:200,
            success:true,
            token: oat,
          }
        }
      }else{
        const oat = await auth.use('api').login(user.datarecord, {expiresIn: '7days'})

        return {
          code:200,
          success:true,
          token: oat,
        }
      }
    } catch (error) {
      return "error:" +error;
    }

  }

}
