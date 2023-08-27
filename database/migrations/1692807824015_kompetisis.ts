import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Kompetisis extends BaseSchema {
  protected tableName = 'kompetisis'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.uuid('category_uuid')
      table.string('name')
      table.text('description').nullable()
      table.date('start_date').nullable()
      table.date('end_date').nullable()
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
