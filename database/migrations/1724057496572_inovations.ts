import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Inovations extends BaseSchema {
  protected tableName = "inovations";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("kategori").nullable();
      table.string("komentar").nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("kategori");
      table.dropColumn("komentar");
    });
  }
}
