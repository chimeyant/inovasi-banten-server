import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid("uuid")
      table.uuid("user_uuid")
      table.string("province_code").nullable()
      table.string("regency_code").nullable()
      table.uuid("opd_uuid").nullable()
      table.string("opd_name").nullable()
      table.string("email").nullable()
      table.string("phone",20).nullable()
      table.string('jabatan_admin').nullable()
      table.string('file_fakta_integritas').nullable()
      table.string("logo").nullable()
      table.string('status',1).defaultTo("0") //0: belum terverifiksi ,


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("deleted_at",{useTz:true})
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
