import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Inovasis extends BaseSchema {
  protected tableName = 'inovasis'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid('category_uuid')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("category_uuid")
    })
  }
}
