import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.uuid('parent_uuid').nullable()
      table.uuid('from_user_uuid').nullable()
      table.uuid("to_user_uuid").nullable()
      table.string('title',500).nullable()
      table.text('body').nullable()
      table.timestamp('sended_at',{useTz:true}).nullable()
      table.timestamp('recieve_at',{useTz:true}).nullable()

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
