import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sinovics extends BaseSchema {
  protected tableName = 'sinovics'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid').notNullable()
      table.string('noreg');
      table.string('tingkat')
      table.uuid("opd_uuid")
      table.string('name',500).index
      table.uuid('jenis_uuid')
      table.uuid('kompetisi_uuid')
      table.uuid('urusan_uuid')
      table.string('kelompok')
      table.string('inisiator')
      table.uuid('bentuk_uuid')
      table.date('waktu_uji')
      table.date('waktu_penerapan')
      table.string('tahapan')
      table.string('youtube')
      table.string('surat_pernyataan_implementasi')
      table.string('surat_pernyataan_identitas')
      table.string('surat_pernyataan_ketersediaan_replikasi')
      table.text('ringkasan')
      table.string('ringkasan_att')
      table.text('latar_belakang')
      table.string("latar_belakang_att")
      table.text("kebaruan")
      table.string('kebaruan_att')
      table.text("implementasi")
      table.string('implementasi_att')
      table.text('signifikansi')
      table.string('signifikansi_att')
      table.text('adaptabilitas')
      table.string('adaptabilitas_att')
      table.text('sumber_daya')
      table.string('sumber_daya_att')
      table.text('strategi_keberlanjutan')
      table.string('strategi_keberlanjutan_att')
      table.string('inovator_nama')
      table.string('inovator_telp')
      table.string('inovator_instansi')
      table.string('inovator_province_code')
      table.string('inovator_regency_code')
      table.string('foto')
      table.string('province_code')
      table.string('regency_code')
      table.string('district_code')
      table.string('village_code')
      table.string('address',255)
      table.string('lat')
      table.string('lng')
      table.decimal('temp_score',6,2)
      table.decimal('finnaly_score',6,2)
      table.string('status',2)

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
