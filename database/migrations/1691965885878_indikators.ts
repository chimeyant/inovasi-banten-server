import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Indikators extends BaseSchema {
  protected tableName = 'indikators'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('optional').defaultTo(false)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('optional')
    })
  }
}
