import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sliders extends BaseSchema {
  protected tableName = 'sliders'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("top_image").nullable()
      table.string('bottom_image').nullable()
      table.boolean("priority_status").defaultTo(false)
      table.integer("priority_number").defaultTo(0)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('top_image')
      table.dropColumn('bottom_image')
      table.dropColumn('priority_status')
      table.dropColumn("priority_number")
    })
  }
}
