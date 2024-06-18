import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Inovations extends BaseSchema {
  protected tableName = "inovations";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal("score1", 6, 2).defaultTo(0);
      table.decimal("score2", 6, 2).defaultTo(0);
      table.decimal("score3", 6, 2).defaultTo(0);
      table.decimal("score4", 6, 2).defaultTo(0);
      table.decimal("score5", 6, 2).defaultTo(0);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("score1");
      table.dropColumn("score2");
      table.dropColumn("score3");
      table.dropColumn("score4");
      table.dropColumn("score5");
    });
  }
}
