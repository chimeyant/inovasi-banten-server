import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import InovationService from 'App/Services/Permohonan/InovationService'

export default class DashboardController {
  protected Service = InovationService
  async index({}: HttpContextContract){
    const result = await this.Service.datachartperbulan()
    return result
  }

  async datacharperproses({}:HttpContextContract){
    const result = await this.Service.datachartperproses()

    return result
  }

  async datamaps({}:HttpContextContract){
    const result = await this.Service.datamaps()

    return result;
  }






}
