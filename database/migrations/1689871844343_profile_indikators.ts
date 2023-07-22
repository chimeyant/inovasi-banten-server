import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProfileIndikators extends BaseSchema {
  protected tableName = 'profile_indikators'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid("uuid")
      table.uuid("profile_uuid").nullable()
      table.uuid('indikator_pemda_uuid').nullable()
      table.text("informasi").nullable()
      table.boolean('status').defaultTo(false)

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
