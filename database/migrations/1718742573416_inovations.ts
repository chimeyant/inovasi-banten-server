import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Inovations extends BaseSchema {
  protected tableName = "inovations";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("tipe", 100).nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("tipe");
    });
  }
}
