import InovationIndicator from "App/Models/InovationIndicator";
import CategoryService from "../MasterData/CategoryService";
import InidkatorService from "../MasterData/InidkatorService";
import Inovation from "App/Models/Inovation";
import {
  MSG_FAILED_PROCESS,
  MSG_UPDATE_NILAI,
  MSG_UPDATE_SUCCESS,
} from "App/Helpers/Lang";

export type InovationIndicatorType = {
  inovation_uuid: string;
  indikator_uuid: string;
  inidkator_name: string;
  score: number;
};

class InovationIndicatorService {
  protected Model = InovationIndicator;

  public async lists(inovation_uuid: string) {
    const model = await this.Model.query()
      .where("inovation_uuid", inovation_uuid)
      .orderBy("id", "asc");

    const datas: {}[] = [];

    model.forEach((element) => {
      datas.push(element.datadisplay);
    });

    return datas;
  }

  public async store(inovation_uuid: string) {
    try {
      //find categpry uuid
      const category = await CategoryService.showByCode("KMP");

      const indikators = await InidkatorService.lists(category.id);

      const datas: {}[] = [];

      indikators.forEach((element) => {
        const row = {};
        row["inovation_uuid"] = inovation_uuid;
        row["indikator_uuid"] = element.id;
        row["indikator_name"] = element.name + " (" + element.skor + ")";
        row["score"] = 0;
        datas.push(row);
      });

      await this.Model.createMany(datas);

      return true;
    } catch (error) {
      return false;
    }
  }

  public async show(id: string) {
    const model = await this.Model.findBy("uuid", id);

    return model?.datarecord;
  }

  public async update(
    payload: InovationIndicatorType,
    id: string,
    inovation_uuid: string
  ) {
    try {
      const model = await this.Model.findBy("uuid", id);
      model?.merge({
        score: payload.score,
      });
      await model?.save();

      //update sinovic score
      //find all score

      const jmlscore = await this.Model.query()
        .knexQuery.sum("score")
        .whereRaw("inovation_uuid = ?", [inovation_uuid]);

      await Inovation.query()
        .where("uuid", payload.inovation_uuid)
        .update({ finnaly_score: jmlscore[0].sum });

      return {
        code: 200,
        success: true,
        message: MSG_UPDATE_SUCCESS,
        data: model?.datadisplay,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: MSG_FAILED_PROCESS,
        error,
      };
    }
  }

  public async updateScore(id: any, nilai: any, user: any) {
    try {
      const model = await this.Model.findBy("uuid", id);
      switch (user.authent) {
        case "team-pengkaji-2":
          model?.merge({
            score2: nilai,
          });
          break;
        case "team-pengkaji-3":
          model?.merge({
            score3: nilai,
          });
          break;
        case "team-pengkaji-4":
          model?.merge({
            score4: nilai,
          });
          break;
        case "team-pengkaji-5":
          model?.merge({
            score5: nilai,
          });
          break;
        default:
          model?.merge({
            score1: nilai,
          });
          break;
      }

      await model?.save();

      return {
        code: 200,
        success: true,
        message: MSG_UPDATE_NILAI,
        data: model?.datadisplay,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: MSG_FAILED_PROCESS,
        error,
      };
    }
  }
}

export default new InovationIndicatorService();
