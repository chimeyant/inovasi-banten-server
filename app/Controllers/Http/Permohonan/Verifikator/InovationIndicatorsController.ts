import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import InovationIndicatorService from "App/Services/Permohonan/InovationIndicatorService";

export default class InovationIndicatorsController {
  protected Service = InovationIndicatorService;

  public async index({ params, auth }: HttpContextContract) {
    const user = auth.user;
    const result = await this.Service.lists(
      params.inovation_uuid,
      user?.authent
    );

    if (result.length < 1) {
      await this.Service.store(params.inovation_uuid);

      const resulstore = await this.Service.lists(
        params.inovation_uuid,
        user?.authent
      );

      return resulstore;
    } else {
      return result;
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ params }: HttpContextContract) {
    const result = await this.Service.show(params.id);

    return result;
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const payload = request.only(["inovation_uuid", "score"]);

    const result = await this.Service.update(
      payload,
      params.id,
      params.inovation_uuid
    );

    return response.send(result);
  }

  public async destroy({}: HttpContextContract) {}

  public async updatescore({
    params,
    request,
    response,
    auth,
  }: HttpContextContract) {
    const { id } = params;
    const { nilai } = request.all();

    const user = auth.user;

    const result = await this.Service.updateScore(id, nilai, user);

    return response.status(result.code).send(result);
  }
}
