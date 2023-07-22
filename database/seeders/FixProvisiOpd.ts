import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Opd from 'App/Models/Opd'

export default class FixProvisiOpdSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Opd.query().whereNull("regencyCode").update({regencyCode:'36'})
  }
}
