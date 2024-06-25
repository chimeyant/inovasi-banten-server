import { DateTime } from "luxon";
import { compose } from "@ioc:Adonis/Core/Helpers";
import { SoftDeletes } from "@ioc:Adonis/Addons/LucidSoftDeletes";
import { v4 as uuid } from "uuid";
import {
  BaseModel,
  beforeCreate,
  column,
  computed,
} from "@ioc:Adonis/Lucid/Orm";

export default class InovationIndicator extends compose(
  BaseModel,
  SoftDeletes
) {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public uuid: string;

  @column()
  public inovationUuid: string;

  @column()
  public indikatorUuid: string;

  @column()
  public indikatorName: string;

  @column()
  public score: number;

  @column()
  public score1: number;

  @column()
  public score2: number;

  @column()
  public score3: number;

  @column()
  public score4: number;

  @column()
  public score5: number;

  @column()
  public userUuid1: string;

  @column()
  public userUuid2: string;

  @column()
  public deletedAt: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(inovationIndicator: InovationIndicator) {
    inovationIndicator.uuid = uuid();
  }

  @computed()
  public get datadisplay() {
    return {
      id: this.uuid,
      name: this.indikatorName,
      score:
        Number(this.score1) +
        Number(this.score2) +
        Number(this.score3) +
        Number(this.score4) +
        Number(this.score5),
    };
  }

  @computed()
  public get datarecord() {
    return {
      id: this.uuid,
      inovation_uuid: this.inovationUuid,
      indikator_uuid: this.indikatorUuid,
      indikator_name: this.indikatorName,
    };
  }
}
