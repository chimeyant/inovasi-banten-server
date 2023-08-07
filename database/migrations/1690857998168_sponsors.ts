import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sponsors extends BaseSchema {
  protected tableName = 'sponsors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid("uuid")
      table.string('name')
      table.string('logo').nullable()
      table.string('website').nullable()
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
