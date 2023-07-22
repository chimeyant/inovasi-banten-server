import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class InovasiHistories extends BaseSchema {
  protected tableName = 'inovasi_histories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.uuid('inovasi_uuid')
      table.uuid('user_uuid')
      table.string('title')
      table.text('content').nullable()
      table.string('status')

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
