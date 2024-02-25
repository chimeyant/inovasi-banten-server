import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class InovasiDocuments extends BaseSchema {
  protected tableName = "inovasi_documents";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("jenis").nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("jenis");
    });
  }
}
