import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Opd from 'App/Models/Opd'

export default class OpdSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Opd.createMany(
      [
        {
          "code": "001000000000000",
          "name": "Dinas Tenaga Kerja dan Transmigrasi"
        },
        {
          "code": "000600000000000",
          "name": "Dinas Pekerjaan Umum dan Penataan Ruang"
        },
        {
          "code": "001900000000000",
          "name": "Dinas Perpustakaan dan Kearsipan"
        },
        {
          "code": "000500000000000",
          "name": "Dinas Kesehatan"
        },
        {
          "code": "000300000000000",
          "name": "Inspektorat"
        },
        {
          "code": "002200000000000",
          "name": "Dinas Pertanian"
        },
        {
          "code": "001400000000000",
          "name": "Dinas Perhubungan"
        },
        {
          "code": "002300000000000",
          "name": "Dinas Ketahanan Pangan"
        },
        {
          "code": "002900000000000",
          "name": "Badan Kepegawaian Daerah"
        },
        {
          "code": "002700000000000",
          "name": "Badan Pendapatan Daerah"
        },
        {
          "code": "003300000000000",
          "name": "Badan Kesatuan Bangsa dan Politik"
        },
        {
          "code": "002800000000000",
          "name": "Badan Pengelolaan Keuangan dan Aset Daerah"
        },
        {
          "code": "003100000000000",
          "name": "Badan Penghubung Daerah"
        },
        {
          "code": "122",
          "name": "Biro Organisasi"
        },
        {
          "code": "002100000000000",
          "name": "Dinas Pariwisata"
        },
        {
          "code": "125",
          "name": "Dinas Kesehatan Kabupaten Serang"
        },
        {
          "code": "003200000000000",
          "name": "Badan Penanggulangan Bencana Daerah"
        },
        {
          "code": "000200000000000",
          "name": "Sekretariat DPRD"
        },
        {
          "code": "000900000000000",
          "name": "Dinas Sosial"
        },
        {
          "code": "123",
          "name": "Dinas Komunikasi dan Informatika"
        },
        {
          "code": "002400000000000",
          "name": "Dinas Energi dan Sumber Daya Mineral"
        },
        {
          "code": "000400000000000",
          "name": "Dinas Pendidikan dan Kebudayaan"
        },
        {
          "code": "003400000000000",
          "name": "Sekretariat BKSP Jabodetabekjur"
        },
        {
          "code": "003000000000000",
          "name": "Badan Pengembangan Sumber Daya Manusia Daerah"
        },
        {
          "code": "002500000000000",
          "name": "Dinas Perindustrian dan Perdagangan"
        },
        {
          "code": "001100000000000",
          "name": "Dinas Lingkungan Hidup dan Kehutanan"
        },
        {
          "code": "001700000000000",
          "name": "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu"
        },
        {
          "code": "002000000000000",
          "name": "Dinas Kelautan dan Perikanan"
        },
        {
          "code": "28817729000222",
          "name": "Badan Perencanaan Pembangunan Daerah"
        },
        {
          "code": "001800000000000",
          "name": "Dinas Kepemudaan dan Olahraga"
        },
        {
          "code": "001200000000000",
          "name": "Dinas Pemberdayaan Perempuan, Perlindungan Anak, Kependudukan dan Keluarga Berencana"
        },
        {
          "code": "001500000000000",
          "name": "Dinas Komunikasi, Informatika, Statistik dan Persandian"
        },
        {
          "code": "002600000000000",
          "name": "Badan Perencanaan Pembangunan Daerah"
        },
        {
          "code": "001600000000000",
          "name": "Dinas Koperasi, Usaha Kecil dan Menengah"
        },
        {
          "code": "001300000000000",
          "name": "Dinas Pemberdayaan Masyarakat dan Desa"
        },
        {
          "code": "000700000000000",
          "name": "Dinas Perumahan Rakyat dan Kawasan Permukiman"
        },
        {
          "code": "000800000000000",
          "name": "Satuan Polisi Pamong Praja"
        },
        {
          "code": "009388837733",
          "name": "DisKominfo Kota Serang"
        },
        {
          "code": "000100000000000",
          "name": "Sekretariat Daerah"
        }
      ]
    )
  }
}
