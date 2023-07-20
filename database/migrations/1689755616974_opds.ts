import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Opds extends BaseSchema {
  protected tableName = 'opds'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("regencyCode")
      table.string("regency_code").nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('regency_code')
      table.string('regencyCode').nullable
    })
  }
}
