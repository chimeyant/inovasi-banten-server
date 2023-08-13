import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FileManagements extends BaseSchema {
  protected tableName = 'file_managements'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('real_name').nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('real_name')
    })
  }
}
