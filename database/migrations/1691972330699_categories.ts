import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('code').nullable()
      table.string('icon').nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('code')
      table.dropColumn('icon')
    })
  }
}
