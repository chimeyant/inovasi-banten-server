import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Bentuk from 'App/Models/Bentuk'

export default class BentukSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Bentuk.createMany([
      {
        name: 'Inovasi Daerah lainnya sesuai dengan Urusan Pemerintahan yang menjadi kewenangan Daerah',
        status:true,
      },
      {
        name:'Inovasi Pelayanan Publik',
        status:true,
      },
      {
        name: 'Inovasi Tata Kelola Pemerintahan Daerah',
        status:true,
      },
      {
        name:'Inovasi Daerah lainnya sesuai dengan Urusan Pemerintahan yang menjadi kewenangan Daerah',
        status:true
      }
    ])
  }
}
