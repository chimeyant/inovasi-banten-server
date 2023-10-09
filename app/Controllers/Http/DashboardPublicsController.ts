 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InovationService from 'App/Services/Permohonan/InovationService'

export default class DashboardPublicsController {
  protected Service = InovationService
  async index({auth}:HttpContextContract){
    const user = auth.user

  const result = await this.Service.dashboardPublic(user)

    return result;
  }
}
