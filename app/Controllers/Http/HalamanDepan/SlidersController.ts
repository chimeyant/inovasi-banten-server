import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Slider from "App/Models/Slider"
import SliderValidator from 'App/Validators/HalamanDepan/SliderValidator';
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"
import SliderService from 'App/Services/HalamanDepan/SliderService';

export default class SlidersController {
  public async index({}: HttpContextContract) {
    const result = await SliderService.list()

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    const payload = request.only(['title','subtitle','content','path','top_image','bottom_image','priority_status','priority_number','status'])

    const result = await SliderService.store(payload)

    return response.status(200).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await SliderService.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request,response}: HttpContextContract) {
    const payload = request.only(['title','subtitle','content','path','top_image','bottom_image','priority_status','priority_number','status'])

    const result = await SliderService.update(payload,params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await SliderService.deleted(params.id)

    return response.status(result.code).send(result)
  }

  public async publish({}:HttpContextContract){
    const result = await SliderService.publish()

    return result;
  }
}
