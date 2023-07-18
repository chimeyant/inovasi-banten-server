import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Opds extends BaseSchema {
  protected tableName = 'opds'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.string('code')
      table.string('name')
      table.string("regencyCode").nullable()
      table.boolean('status').defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('deleted_at',{useTz:true})
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
