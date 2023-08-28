import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Indikators extends BaseSchema {
  protected tableName = 'indikators'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('description').nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('description')
    })
  }
}
