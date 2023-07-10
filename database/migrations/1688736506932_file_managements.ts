import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FileManagements extends BaseSchema {
  protected tableName = 'file_managements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.uuid('root_uuid').nullable()
      table.string('folder_name')
      table.string('name')
      table.string('ext')
      table.bigInteger('size').defaultTo(0)
      table.string("type").nullable()
      table.string("mime").nullable()
      table.boolean("used").defaultTo(false)

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
