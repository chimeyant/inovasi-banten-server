import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name').nullable()
      table.string("nama_admin").nullable()
      table.string('alamat',255).nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("name")
      table.dropColumn('nama_admin')
      table.dropColumn("alamat")
    })
  }
}
