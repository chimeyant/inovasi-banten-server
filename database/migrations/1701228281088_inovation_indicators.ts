import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class InovationIndicators extends BaseSchema {
  protected tableName = 'inovation_indicators'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('score1').defaultTo(0)
      table.integer('score2').defaultTo(0)
      table.uuid('user_uuid_1').nullable()
      table.uuid('user_uuid_2').nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('score1')
      table.dropColumn('score2')
      table.dropColumn('user_uuid_1')
      table.dropColumn('user_uuid_2')
    })
  }
}
