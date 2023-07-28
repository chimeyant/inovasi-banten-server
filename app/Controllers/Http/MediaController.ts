import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from "@ioc:Adonis/Core/Application"
import Env from "@ioc:Adonis/Core/Env"
import {v4 as uuid} from "uuid"
import Drive from '@ioc:Adonis/Core/Drive'
import FileManagementService from '../../Services/Utility/FileManagementService'

const chunk_inpt = "file";

export default class MediaController {

  public async store({request, response, auth}: HttpContextContract){
    const {doctype}= request.only(['doctype'])


    const file = request.file(chunk_inpt, {size:'2mb', extnames:['jpeg','jpg','png','pdf','svg','doc','xls','xlsx','docx']})

    if(!file?.isValid){
      return response.forbidden();
    }

    try {

      const name = `${uuid()}.${file?.extname}`
      let url;

      if(Env.get('NODE_ENV')=='development'){
        if(doctype === 'sliders'){
          await file?.move(Application.tmpPath("../storage/images/sliders"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/sliders/"+ name, {expiresIn:'1m'})
        }
        else if(doctype==='avatars'){
          await file?.move(Application.tmpPath("../storage/images/avatars"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/avatars/"+ name, {expiresIn:'1m'})
        }
        else if(doctype==='documents'){
          await file?.move(Application.tmpPath("../storage/documents"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("documents/"+ name,{expiresIn:'1m'})
        }
        else{
          await file?.move(Application.tmpPath("../storage/images/apps"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/apps/"+ name, {expiresIn:'1m'})
        }
      }

      else{
        if(doctype === 'sliders'){
          await file?.move(Application.tmpPath("../../storage/images/sliders"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/sliders/"+ name,{expiresIn:'1m'})
        }
        else if(doctype==='avatars'){
          await file?.move(Application.tmpPath("../../storage/images/avatars"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/avatars/"+ name, {expiresIn:'1m'})
        }
        else if(doctype==='documents'){
          await file?.move(Application.tmpPath("../../storage/documents"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("documents/"+ name,{expiresIn:'1m'})
        }
        else{
          await file?.move(Application.tmpPath("../../storage/images/apps"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/apps/"+ name, {expiresIn:'1m'})
        }
      }


      //save to file manajemen
      const payload = {
        name: name,
        ext: file?.extname,
        size: file?.size,
        type: file?.type,
        mime: file?.subtype,
        used: false,
        ip: request.ip(),
        user_uuid: auth.user?.id
      }

      await FileManagementService.store(payload)

      return response.json({
        status: true,
        name: name,
        slug:name,
        size:file?.size,
        type: file?.type,
        mime: file?.subtype,
        extn: file?.extname,
        path: Env.get("BASE_URL") + url
      })
    } catch (error) {
      return response.json({
        status:error
      })
    }
  }



}
