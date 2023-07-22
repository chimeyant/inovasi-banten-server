import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class InovasiDocuments extends BaseSchema {
  protected tableName = 'inovasi_documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.uuid('inovasi_uuid').nullable()
      table.uuid('indikator_uuid').nullable()
      table.uuid("inovasi_indikator_uuid").nullable()
      table.string('nomor_dokumen').nullable()
      table.date("tanggal_dokumen").nullable()
      table.text("tentang").nullable()
      table.string('type_file').nullable()
      table.string('file_dokumen').nullable()


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
