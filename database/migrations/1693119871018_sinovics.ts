import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sinovics extends BaseSchema {
  protected tableName = 'sinovics'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid('user_uuid').nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("user_uuid")
    })
  }
}
