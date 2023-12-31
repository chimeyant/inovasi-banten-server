import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class InovasiIndikators extends BaseSchema {
  protected tableName = 'inovasi_indikators'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.uuid('inovasi_uuid').nullable()
      table.uuid('indikator_uuid').nullable()
      table.boolean('information_completed').defaultTo(false)
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
