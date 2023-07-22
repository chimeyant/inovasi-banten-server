import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Inovasis extends BaseSchema {
  protected tableName = 'inovasis'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid("uuid")
      table.string('name')
      table.string('nomor_register').nullable()
      table.uuid("opd_uuid")
      table.uuid("jenis_inovasi_uuid").nullable()
      table.uuid("urusan_uuid").nullable()
      table.uuid('bentuk_uuid').nullable()
      table.string("inisiator").nullable()
      table.date("waktu_uji").nullable()
      table.date('waktu_penerapan').nullable()
      table.string('tahapan').nullable()
      table.decimal("kematangan",6, 2)
      table.text('rancang_bangun').nullable()
      table.text('tujuan').nullable()
      table.text("manfaat").nullable()
      table.text('hasil').nullable()
      table.string("file_anggaran").nullable()
      table.string("file_profil_bisnis").nullable()
      table.integer('skor').defaultTo(0)
      table.integer('tahun').nullable()
      table.text("latar_belakang").nullable()
      table.text("regulasi").nullable()
      table.text("sosialisasi_kebijakan").nullable()
      table.text("bimtek").nullable()
      table.text("layanan_pengaduan").nullable()
      table.text("permasalahan").nullable()
      table.string('inovator_nama').nullable()
      table.string('inovator_phone',20).nullable()
      table.string('inovator_instansi').nullable()
      table.string('inovator_province_code').nullable()
      table.string("inovator_regency_code").nullable()
      table.string("foto").nullable()
      table.string('video').nullable()
      table.string("youtube").nullable()
      table.string('province_code').nullable()
      table.string('regency_code').nullable()
      table.string('district_code').nullable()
      table.string('village_code').nullable()
      table.string("alamat",500).nullable()
      table.string('alamat_dalam_peta',500).nullable()
      table.string('lat').nullable()
      table.string('lng').nullable()
      table.date("sending_date").nullable()
      table.uuid("sending_user_uuid").nullable()
      table.date("verified_date").nullable()
      table.uuid("verified_user_uuid").nullable()
      table.date("publish_date").nullable()
      table.uuid("publish_user_uuid").nullable()
      table.uuid('deleted_user_uuid').nullable()
      table.uuid("updated_user_uuid").nullable()
      table.uuid("created_user_uuid").nullable()
      table.string('status',2).defaultTo(0)

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
