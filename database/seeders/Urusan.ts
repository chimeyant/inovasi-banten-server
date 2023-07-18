import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Urusan from 'App/Models/Urusan'

export default class UrusanSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Urusan.createMany(
      [
        {
          "name": "Jalan Raya",
          "img": "jalan.png",
          "status": true
        },
        {
          "name": "Pendidikan",
          "img": "graduation.png",
          "status": true
        },
        {
          "name": "Jembatan",
          "img": "jembatan.png",
          "status": true
        },
        {
          "name": "Pariwisata",
          "img": "beach.png",
          "status": true
        },
        {
          "name": "Permukiman dan Lahan",
          "img": "home.png",
          "status": true
        },
        {
          "name": "Gedung Pemerintah",
          "img": "gedung.png",
          "status": true
        },
        {
          "name": "Lalu Lintas",
          "img": "true5true488false4493truetrue4.jpg",
          "status": false
        },
        {
          "name": "Keamanan",
          "img": "badge.png",
          "status": false
        },
        {
          "name": "Listrik",
          "img": "electric.png",
          "status": false
        },
        {
          "name": "Air",
          "img": "water.png",
          "status": false
        },
        {
          "name": "Pariwisata",
          "img": "tourism.png",
          "status": false
        },
        {
          "name": "Pelayanan Masyarakat",
          "img": "reception.png",
          "status": false
        },
        {
          "name": "Pemuda dan Olah Raga",
          "img": "pora.png",
          "status": true
        },
        {
          "name": "Kesehatan",
          "img": "kesehatan.png",
          "status": true
        },
        {
          "name": "Webmaster",
          "img": "true5true488false4true5true6true3.jpg",
          "status": true
        },
        {
          "name": "testtrue",
          "img": "true5true6false634false33895.png",
          "status": false
        },
        {
          "name": "Umum",
          "img": "true52false2377878946.jpeg",
          "status": true
        },
        {
          "name": "komunikasi dan informatika",
          "img": "na",
          "status": true
        },
        {
          "name": "Pangan",
          "img": "na",
          "status": true
        },
        {
          "name": "Fungsi Penunjang lainnya sesuai dengan ketentuan peraturan perundang-undangan",
          "img": "na",
          "status": true
        },
        {
          "name": "pemberdayaan masyarakat dan Desa",
          "img": "na",
          "status": true
        },
        {
          "name": "Perindustrian",
          "img": "na",
          "status": true
        },
        {
          "name": "Perumahan Rakyat dan Kawasan Permukiman",
          "img": "na",
          "status": true
        },
        {
          "name": "Keuangan",
          "img": "na",
          "status": true
        },
        {
          "name": "Penanaman Modal",
          "img": "na",
          "status": true
        },
        {
          "name": "Energi dan Sumber Daya Mineral",
          "img": "na",
          "status": true
        },
        {
          "name": "Pertanian",
          "img": "na",
          "status": true
        },
        {
          "name": "Pekerjaan Umum dan Penataan Ruang",
          "img": "na",
          "status": true
        },
        {
          "name": "Pengendalian Penduduk dan Keluarga Berencana",
          "img": "na",
          "status": true
        },
        {
          "name": "Pemberdayaan Perempuan dan Pelindungan Anak",
          "img": "na",
          "status": true
        },
        {
          "name": "Perdagangan",
          "img": "na",
          "status": true
        },
        {
          "name": "Sosial",
          "img": "na",
          "status": true
        }
      ]
    )
  }
}
