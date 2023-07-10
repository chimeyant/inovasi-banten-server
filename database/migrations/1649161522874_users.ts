import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string("name",255).notNullable()
      table.string('email', 255).notNullable()
      table.string("authent", 100).nullable()
      table.string("avatar").nullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.boolean('socialmedia').defaultTo(false)
      table.string('phone').nullable()
      table.string('tingkat').defaultTo(2);
      table.uuid("opd_uuid").nullable()
      table.uuid('root_uuid').nullable()
      table.uuid('parent_uuid').nullable()
      table.boolean('status')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("deleted_at",{useTz:true})
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
