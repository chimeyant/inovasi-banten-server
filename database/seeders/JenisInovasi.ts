import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import JenisInovasi from 'App/Models/JenisInovasi'

export default class JenisInovasiSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await JenisInovasi.createMany([
      {
        name:'Non Teknologi',
        status:true
      },
      {
        name:'Teknologi',
        status:true
      }
    ])
  }
}
