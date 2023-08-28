import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SinovicIndikators extends BaseSchema {
  protected tableName = 'sinovic_indikators'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.uuid('sinovic_uuid')
      table.uuid('indikator_uuid')
      table.string('indikator_name').nullable()
      table.decimal('score',6,2).nullable()

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
