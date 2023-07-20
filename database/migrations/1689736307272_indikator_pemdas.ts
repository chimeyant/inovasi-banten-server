import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IndikatorPemdas extends BaseSchema {
  protected tableName = 'indikator_pemdas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid("uuid")
      table.uuid('category_uuid').nullable()
      table.string('name')
      table.integer('skor').defaultTo(0)
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
