import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class InovationIndicators extends BaseSchema {
  protected tableName = "inovation_indicators";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal("bobot1", 12, 2).nullable();
      table.decimal("bobot2", 12, 2).nullable();
      table.decimal("bobot3", 12, 2).nullable();
      table.decimal("bobot4", 12, 2).nullable();
      table.decimal("bobot5", 12, 2).nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("bobot1");
      table.dropColumn("bobot2");
      table.dropColumn("bobot3");
      table.dropColumn("bobot4");
      table.dropColumn("bobot5");
    });
  }
}
